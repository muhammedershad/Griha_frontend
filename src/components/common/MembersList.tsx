import { useState } from "react";
import UsersProfileCard from "./UsersProfileCard";


const MembersList = ({ users, selectedUsers, onUserSelect, edit = true, heading }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((user) =>
        `${user.firstName || user.FirstName} ${user.lastName || user.LastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* bg-gradient-to-r from-blue-950 to-blck-400 shadow-lg rounded-lg */}
            <div className={`${edit ? "h-44" : "h-72"} p-3 bg-gradient-to-b from-slate-500 to-slate-800 shadow-lg rounded-lg flex flex-col`}>
                <h3 className="font-semibold text-lg mb-3">{!edit && `${heading}`}</h3>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 px-3 border mb-2 bg-slate-800 border-gray-500 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                <div className="flex-1 overflow-auto">
                    {filteredUsers.map((user) => (
                        <UsersProfileCard key={user._id} user={user} selectedUsers={selectedUsers} onUserSelect={onUserSelect} edit={edit} />
                    ))}
                    {/* Add more UsersProfileCard components as needed */}
                </div>
            </div>
        </>
    );
};

export default MembersList;
