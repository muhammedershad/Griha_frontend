import React from "react";

interface Props {
    title: string;
}

const SideHeading: React.FC<Props> = ({ title }) => {
    return <h3 className="text-xl m-5 font-semibold text-gray-200">{title}</h3>;
};

export default SideHeading;
