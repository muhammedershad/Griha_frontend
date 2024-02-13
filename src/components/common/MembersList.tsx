import React, { useState } from "react";
import UsersProfileCard from "./UsersProfileCard";
import { Employees } from "../../interfaces/employee";
import User from "../../interfaces/user";

interface MembersListProps {
  users: (User | Employees)[];
  selectedUsers: string[]; // Assuming it's an array of user IDs, adjust the type accordingly
  onUserSelect: (userId: string) => void; // Assuming it's a function that takes a user ID, adjust the type accordingly
  edit?: boolean;
  heading: string;
}

const MembersList: React.FC<MembersListProps> = ({ users, selectedUsers, onUserSelect, edit = true, heading }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    `${user.firstName || user?.FirstName} ${user.lastName || user?.LastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
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

