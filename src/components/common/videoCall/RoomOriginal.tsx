import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../../Services/context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../../../Services/videoCall/peer";

type WebRTCOffer = {
    sdp: string;
    type: "offer";
};

type IncommingCallPayload = {
    from: string;
    offer: WebRTCOffer;
};

type WebRTCAnswer = {
    sdp: string;
    type: "answer";
};

type NegoNeedIncomingPayload = {
    from: string;
    offer: WebRTCOffer;
};

function Room() {
    const [remoteSocketId, setRemoteSocketId] = useState<string>();
    const [myStream, setMyStream] = useState<null | MediaStream>(null);
    const [remoteStream, setRemoteStream] = useState<string>();
    const socket = useSocket();

    const handleUserJoined = useCallback(
        ({ email, id }: { email: string; id: string }) => {
            console.log(`${email} joined room`);
            setRemoteSocketId(id);
        },
        []
    );
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket?.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }: IncommingCallPayload) => {
            console.log("incoming call", from, offer);
            setRemoteSocketId(from);

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });

                setMyStream(stream);

                const ans = await peer.getAnswer(offer);
                socket?.emit("call:accepted", { to: from, ans });
            } catch (error) {
                // Handle errors, if any
                console.error(
                    "Error getting user media or processing incoming call:",
                    error
                );
            }
        },
        [socket, peer]
    );

    const sendStreams = useCallback(() => {
        if (myStream) {
            for (const track of myStream.getTracks()) {
                peer.peer.addTrack(track, myStream);
            }
        }
    }, [myStream, peer]);

    const handleCallAccepted = useCallback(
        ({ ans }: { from: string; ans: WebRTCAnswer }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [peer, sendStreams]
    );

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev: { streams: any }) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

        return () => {
            peer.peer.removeEventListener(
                "negotiationneeded",
                handleNegoNeeded
            );
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }: NegoNeedIncomingPayload) => {
            const ans = await peer.getAnswer(offer);
            socket?.emit("peer:nego:done", { to: from, ans });
        },
        [socket, peer]
    );

    const handleNegoNeedFinal = useCallback(
        async ({ ans }: { ans: WebRTCAnswer }) => {
            await peer.setLocalDescription(ans);
        },
        [peer]
    );

    useEffect(() => {
        socket?.on("user:joined", handleUserJoined);
        socket?.on("incomming:call", handleIncommingCall);
        socket?.on("call:accepted", handleCallAccepted);
        socket?.on("peer:nego:needed", handleNegoNeedIncomming);
        socket?.on("peer:nego:final", handleNegoNeedFinal);

        return () => {
            socket?.off("user:joined", handleUserJoined);
            socket?.off("incomming:call", handleIncommingCall);
            socket?.off("call:accepted", handleCallAccepted);
            socket?.off("peer:nego:needed", handleNegoNeeded);
            socket?.off("peer:nego:needed", handleNegoNeedIncomming);
            socket?.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
    ]);

    return (
        <>
            <div
                style={{ backgroundImage: 'url("")' }}
                className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
            >
                {/* Background Image CSS */}
                <div className="text-white flex">
                    Room
                    <br />
                    {remoteSocketId ? "connected" : "no one here"}
                    <br />
                    {remoteSocketId && (
                        <button onClick={handleCallUser}>Call </button>
                    )}
                    {myStream && (
                        <button onClick={sendStreams}>Send Stream</button>
                    )}
                </div>

                <div>
                    {myStream && remoteStream && (
                        <div className="flex flex-col rounded-md md:flex-row md:space-x-4">
                            {/* Stream Player for My Stream */}
                            <ReactPlayer
                                playing
                                muted
                                height="500px"
                                width="700px"
                                url={myStream}
                                className="md:w-1/2 rounded-md"
                            />

                            {/* Stream Player for Remote Stream */}
                            <ReactPlayer
                                playing
                                muted
                                height="500px"
                                width="700px"
                                url={remoteStream}
                                className="md:w-1/2 rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Room;
