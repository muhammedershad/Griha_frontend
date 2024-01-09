import React from "react";
import UsersProfileCard from "./UsersProfileCard";

const MembersList = () => {
    return (
        <>
            <div className="h-44 p-3 bg-gradient-to-r from-blue-950 to-blck-400 shadow-lg rounded-lg flex flex-col">
  <input
    type="text"
    placeholder="Type something..."
    className="w-full h-10 px-3 border mb-2 bg-slate-800 border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-500"
  />
  <div className="flex-1 overflow-auto">
    <UsersProfileCard />
    <UsersProfileCard />
    <UsersProfileCard />
    {/* Add more UsersProfileCard components as needed */}
  </div>
</div>

        </>
    );
};

export default MembersList;
