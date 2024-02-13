import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../../Services/context/SocketProvider";
import { useNavigate } from "react-router-dom";

const Lobby: React.FC = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const socket = useSocket();

    const handleSubmitForm = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            socket?.emit("room:join", { email, room });
        },
        [email, room, socket]
    );

    const handleJoinRoom = useCallback((data: { email: any; room: any }) => {
        const { email, room } = data;
        navigate(`/room/${room}`);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("room:join", handleJoinRoom);

            return () => {
                socket.off("room:join", handleJoinRoom);
            };
        }
    }, [socket, handleJoinRoom]);

    return (
        <>
            <div className="text-white">Lobby</div>
            <form className="text-white" onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email Id</label>
                <input
                    className="text-black"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                />
                <br />
                <br />
                <label htmlFor="room">Room</label>
                <input
                    className="text-black"
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    id="room"
                />
                <br />
                <br />
                <button>join</button>
            </form>
        </>
    );
};

export default Lobby;
