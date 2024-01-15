import React from "react";
import { Employees } from "../../interfaces/employee";
import User from "../../interfaces/user";

interface Props {
    user: Employees | User;
    selectedUsers: string | undefined[];
    onUserSelect: (id: string | undefined) => void;
    edit: boolean;
}
const UsersProfileCard: React.FC<Props> = ({
    user,
    selectedUsers,
    onUserSelect,
    edit = true,
}) => {
    return (
        <div className="w-full mt-4 flex items-center text-left rounded-lg bg-slate-800 overflow-hidden">
            <div className="w-full p-1 flex flex-row justify-between">
                <div className="flex">
                {edit && (
                    <input
                        type="checkbox"
                        value={user?._id}
                        checked={selectedUsers.includes(user?._id)}
                        onChange={() => onUserSelect(user._id)}
                        className=""
                    />
                )}
                <img
                    className="rounded-full p-1 h-16 w-16 text-left object-cover object-center"
                    src={
                        user.image ||
                        "https://blenderartists.org/uploads/default/original/4X/6/a/d/6adcaac6f7378fbf998f5ea0490724cea82eb01f.jpeg"
                    }
                    alt=""
                />
                <div className="w-fit ml-3 text-left items-start align-middle">
                    <h3 className="text-white text-left font-semibold text-lg">
                        {`${user.firstName || user.FirstName} ${
                            user.lastName || user.LastName || ""
                        }`}
                    </h3>
                    <h5 className="text-gray-300">
                        {user.jobRole || user.username || user.Username}
                    </h5>
                </div>
                </div>
                <div className="flex items-center">
                    {!edit && <h5 className="text-green-600 md:pr-10 pr-5 align-middle">{"Chat"}</h5>}
                </div>
            </div>
        </div>
    );
};

export default UsersProfileCard;
