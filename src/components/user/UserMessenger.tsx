import SmallSideBar from "../common/SmallSideBar";
import UserCard from "./UserCard";
import background from "../../../public/images/1549504.jpg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Services/redux/hooks";
import messageApi from "../../Services/apis/messageApi";
import User from "../../interfaces/user";
import { Spinner } from "flowbite-react";
import api from "../../Services/api";
import { userloginSuccess, userlogout } from "../../Services/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Message from "../common/messenger/Message";
import { io } from "socket.io-client";
import { useSocket } from "../../Services/context/SocketProvider";

function UserMessenger() {
    const [conversations, setConversation] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState()
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState()
    const [newMessage, setNewMessage] = useState('')
    const scrollRef = useRef();
    const socket = useSocket()
    console.log(socket);

    useEffect(() => {
        console.log('object')
        socket?.on('welcome', (data) => {
            console.log(data)
        })
    },[socket])

    useEffect(() => {
        const savedToken = localStorage.getItem("User_token");
        if (savedToken && !user) {
            const updateSlice = async () => {
                const response = await api.UpdateSlice(savedToken);
                //  console.log(response );
                if (response?.success) {
                    setUser(response.user)
                    dispatch(
                        userloginSuccess({
                            user: response.user,
                            token: savedToken,
                            error: false,
                        })
                    );
                    (async () => {
                        const responseData = await messageApi.conversation(response.user?._id);
                        // console.log(responseData);
                        if (responseData) {
                            setConversation(responseData);
                            setLoading(false)
                        }
                    })();
                } else {
                    logout();
                }
            };
            updateSlice();
        }
    },[]);

    useEffect(() => {
        // console.log(currentChat);
        (async () => {
            const response = await messageApi.chat(currentChat?._id)
            if(response) {
                // console.log(response);
                setMessages(response)
            }
        })()
    },[currentChat])

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
            conversationId: currentChat?._id
        }

        const response = await messageApi.sendMessage(message)
        // console.log(response);
        
        setMessages([...messages, response])
        setNewMessage('')
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="flex w-full h-screen gap-2">
                        <div className="w-1/4 flex">
                            <SmallSideBar />

                            <div className="h-screen max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flow-root">
                                    {conversations.map((conversation, index) => (
                                        <div onClick={() => setCurrentChat(conversation)}>
                                            <UserCard conversation={conversation} userId={user?._id} key={index} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-3/4 flex flex-col h-screen bg-green-500"
                            style={{
                                backgroundImage: `url("${background}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "saturate(0.5)",
                            }}
                        >
                            {
                                currentChat ? (<>
                                <div className="h-[60px] w-full bg-gray-900">
                                SADa
                            </div>

                            <div className="flex-grow w-full overflow-y-scroll ">
                                
                                {
                                    messages?.map((m) => (
                                        <div ref={scrollRef} >
                                            <Message message={m} own={m?.sender === user?._id} />
                                        </div>
                                     ) )
                                }
                                
                            </div>

                            <div className="w-full bg-gray-900 self-end">
                                <input onChange={(e) => setNewMessage(e.target.value)} defaultValue={newMessage} type="text" />
                                <button onClick={handleSendMessage}>send</button>
                            </div>
                                </>) : (
                                <div>
                                    Select one chat
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMessenger