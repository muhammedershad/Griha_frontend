import React from "react";
import { format } from "timeago.js";

function Message({ message, own = false }) {
    return (
        <div
            className={`flex ${
                own ? "justify-end" : "justify-start"
            } my-1 gap-2.5`}
        >
            {!own && (
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://storage.prompt-hunt.workers.dev/clg3sqmjo0001jn08bq79yqzo_1"
                    alt="Jese image"
                />
            )}
            <div
                className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ${
                    own ? "self-start" : "self-end"
                }`}
            >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {}
                    </span> */}
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.text}
                </p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {format(message.createdAt)}
                </span>
                {/* {own && (
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Delivered
      </span>
    )} */}
            </div>
        </div>
    );
}

export default Message;
