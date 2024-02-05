import React from "react";
import {format} from 'timeago.js'

function Comments({comments}) {
    return (
        <>
            {
                comments.map((comment, ind) => (
                    <div key={ind} className="flex items-start gap-2.5 mb-2">
                <img
                    className="w-8 h-8 rounded-full"
                    src={comment.user.image}
                    alt="Jese image"
                />
                <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {comment.user.firstName + " " + comment.user.lastName}
                        </span>
                        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {format(comment.time)}
                        </span> */}
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {comment?.comment}
                    </p>
                    <span className="text-sm font-normal self-end text-gray-500 dark:text-gray-400">
                        {format(comment.time)}
                        </span>
                </div>
            </div>
                ))
            }
        </>
    );
}

export default Comments;
