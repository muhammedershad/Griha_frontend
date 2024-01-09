import React from "react";

interface Props {
    title: string;
}

const SmallButton: React.FC<Props> = ({ title }) => {
    return (
        <button className="bg-gradient-to-r from-[#2d63d8] to-[#02155c] opacity-80 hover:bg-blue-700 text-white font-normal py-1 px-4 rounded-full">
            {title}
        </button>
    );
};

export default SmallButton;
