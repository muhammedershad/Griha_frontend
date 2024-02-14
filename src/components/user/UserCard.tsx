import { useEffect, useState } from "react";
import api from "../../Services/api";
import User from "../../interfaces/user";
import { Employees } from "../../interfaces/employee";
import { Conversation } from "../../interfaces/conversation";

function UserCard({
    conversation,
    userId,
}: {
    conversation: Conversation;
    userId: string;
}) {
    const [friend, setFriend] = useState<User | Employees>();
    // console.log(conversation, userId,'userid');
    useEffect(() => {
        const friendId = conversation.members.find((m: any) => m != userId);
        // console.log(friendId);
        (async () => {
            const response = await api.userDetails(friendId!);
            if (response) {
                setFriend(response.user);
            }
        })();
    }, []);
    return (
        <>
            <div className="flex text-start gap-2 p-0 items-center w-full">
                <img
                    className="h-12 w-12 my-2 rounded-full"
                    src={
                        friend?.image ||
                        "https://storage.prompt-hunt.workers.dev/clg3sqmjo0001jn08bq79yqzo_1"
                    }
                    alt=""
                />
                <div className="">
                    <p className="font-bold text-start text-white text-lg">
                        {friend?.firstName ??
                            friend?.firstName + " " + friend?.lastName ??
                            friend?.lastName}
                    </p>
                    {/* <p>hsfs sdfsd sdfdffddd</p> */}
                </div>
                <div className="flex text-white fa-align-center">
                    {/* <p>{conversation?.time}</p> */}
                </div>
            </div>
            <hr className="border-gray-900" />
        </>
    );
}

export default UserCard;
