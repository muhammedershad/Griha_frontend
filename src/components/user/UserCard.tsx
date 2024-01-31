import React, { useEffect, useState } from "react";
import api from "../../Services/api";

function UserCard({conversation, userId}) {
    const [friend, setFriend] = useState()
    // console.log(conversation, userId,'userid');
    useEffect(() => {
        const friendId = conversation.members.find((m) => m != userId );
        // console.log(friendId);
        (async () => {
            const response = await api.userDetails(friendId)
            if(response) {
                setFriend(response.user)
            }
        })()
    },[])
    return (
        <>
            <div className="flex gap-2 p-0 items-center justify-between">
                <img
                    className="h-12 w-12 my-2 rounded-full"
                    src={friend?.Image || 'https://storage.prompt-hunt.workers.dev/clg3sqmjo0001jn08bq79yqzo_1'}
                    alt=""
                />
                <div className="">
                    <p className="font-bold text-lg">{friend?.FirstName}</p>
                    <p>hsfs sdfsd sdfdffddd</p>
                </div>
                <div className="flex fa-align-center">
                    <p>10.30</p>
                </div>
            </div>
            <hr className="border-gray-900" />
        </>
    );
}

export default UserCard;
