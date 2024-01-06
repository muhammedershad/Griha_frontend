import React from "react";

interface Props {
    title: string;
}

const SmallButton: React.FC<Props> = ({ title }) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-4 rounded-full">
            {title}
        </button>
    );
};

export default SmallButton;
