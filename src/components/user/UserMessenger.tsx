import SmallSideBar from "../common/SmallSideBar";
import UserCard from "./UserCard";
import background from "../../../public/images/1549504.jpg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Services/redux/hooks";
import messageApi from "../../Services/apis/messageApi";
import User from "../../interfaces/user";
import { Spinner } from "flowbite-react";
import api from "../../Services/api";
import {
    userloginSuccess,
    userlogout,
} from "../../Services/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Message from "../common/messenger/Message";
import { io } from "socket.io-client";
import { useSocket } from "../../Services/context/SocketProvider";

function UserMessenger() {
    const [conversations, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState();
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState();
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const socket = useSocket();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // console.log(socket);

    useEffect(() => {
        socket?.emit("addUser", user?._id);
        socket?.on("getUsers", (users) => {
            console.log(users, "userss");
        });
    }, [user, socket]);

    useEffect(() => {
        const savedToken = localStorage.getItem("User_token");
        if (savedToken && !user) {
            const updateSlice = async () => {
                const response = await api.UpdateSlice(savedToken);
                //  console.log(response );
                if (response?.success) {
                    setUser(response.user);
                    dispatch(
                        userloginSuccess({
                            user: response.user,
                            token: savedToken,
                            error: false,
                        })
                    );
                    (async () => {
                        const responseData = await messageApi.conversation(
                            response.user?._id
                        );
                        // console.log(responseData);
                        if (responseData) {
                            setConversation(responseData);
                            setLoading(false);
                        }
                    })();
                } else {
                    logout();
                }
            };
            updateSlice();
        }
    }, []);

    useEffect(() => {
        console.log(user?._id);
        (async () => {
            const response = await messageApi.chat(currentChat?._id);
            if (response) {
                // console.log(response);
                setMessages(response);
            }
        })();
        console.log(currentChat);
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const navigate = useNavigate();

    const logout = async () => {
        api.adminLogout();
        localStorage.removeItem("User_token");
        dispatch(userlogout());
        navigate("/login");
    };

    const handleSendMessage = async () => {
        // console.log(newMessage);
        const message = {
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat?._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user?._id
        );

        socket?.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            text: newMessage,
        });

        const response = await messageApi.sendMessage(message);
        // console.log(response);

        setMessages([...messages, response]);
        setNewMessage("");
    };

    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="flex w-full h-screen gap-2">
                        <div className="w-1/4 flex">
                            <SmallSideBar />

                            <div className="h-screen max-w-md w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flow-root">
                                    {conversations.map(
                                        (conversation, index) => (
                                            <div
                                                onClick={() =>
                                                    setCurrentChat(conversation)
                                                }
                                            >
                                                <UserCard
                                                    conversation={conversation}
                                                    userId={user?._id}
                                                    key={index}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-3/4 flex flex-col h-screen"
                            style={{
                                backgroundImage: `url("${background}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "saturate(0.5)",
                            }}
                        >
                            {currentChat ? (
                                <>
                                    <div className="h-[60px] align-middle items-center flex w-full bg-gray-900">
                                        <img
                                            className="h-12 w-12 my-2 ml-3 rounded-full"
                                            src={
                                                "https://storage.prompt-hunt.workers.dev/clg3sqmjo0001jn08bq79yqzo_1"
                                            }
                                            alt=""
                                        />
                                         <p className="text-white mx-4">User</p>
                                    </div>

                                    <div className="flex-grow w-full overflow-y-scroll ">
                                        {messages?.map((m, i) => (
                                            <div ref={scrollRef}>
                                                <Message
                                                    key={i}
                                                    message={m}
                                                    own={
                                                        m?.sender === user?._id
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <input
                                            value={newMessage}
                                            onChange={(e) =>
                                                setNewMessage(e.target.value)
                                            }
                                            id="search"
                                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Message"
                                            required
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={newMessage.trim() === ""}
                                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-30 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full font-bold flex-grow w-full text-white text-3xl flex justify-center items-center text-center">Select one chat</div>

                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMessenger;
