import React from "react";

function Comments({comments}) {
    return (
        <>
            {
                comments.map((comment, ind) => (
                    <div key={ind} className="flex items-start gap-2.5 mb-2">
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png"
                    alt="Jese image"
                />
                <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Muhammed Ershad
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            11:46
                        </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {comment?.comment}
                    </p>
                </div>
            </div>
                ))
            }
        </>
    );
}

export default Comments;
