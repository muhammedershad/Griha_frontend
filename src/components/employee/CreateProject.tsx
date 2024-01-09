import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import Form from "../common/Form";
import UsersProfileCard from "../common/UsersProfileCard";
import MembersList from "../common/MembersList";

const CreateProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fromData, setFormData] = useState();

    const [users, setUsers] = useState([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
        // Add more users as needed
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    useEffect(() => {
        console.log(fromData, selectedUsers);
    }, [fromData, selectedUsers]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formFields = [
        {
            placeholder: "Project Name",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "projectName",
        },
        {
            placeholder: "Site Location Address",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "address",
        },
        {
            placeholder: "District",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "district",
        },
        {
            placeholder: "State",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "state",
        },
        {
            placeholder: "Pin Code",
            type: "number",
            defaultValue: "",
            isRequired: true,
            data: "pinCode",
        },
        {
            placeholder: "Location Longitude and Latitude",
            type: "string",
            defaultValue: "",
            isRequired: true,
            data: "longitudeAndLatitude",
        },
    ];
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className=" space-y-1 md:space-y-4 sm:p-3">
                    <Form obj={formFields} setData={setFormData}>
                        <MembersList />
                    </Form>
                    <button
                        onClick={closeModal}
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-[#8e1c1c] to-[#422c34] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        cancel
                    </button>
                </div>
            </Modal>
            <button
                onClick={openModal}
                className="bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-blue-700 text-white font-normal py-1 px-4 rounded-full"
            >
                Create Project
            </button>
        </>
    );
};

const UserList = ({ users, selectedUsers, onUserSelect }) => {
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <label>
                            <input
                                type="checkbox"
                                value={user.id}
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => onUserSelect(user.id)}
                            />
                            {user.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
        // Add more users as needed
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (
        <div>
            <h1>Create Group</h1>
            <UserList
                users={users}
                selectedUsers={selectedUsers}
                onUserSelect={handleUserSelect}
            />
            <button
                onClick={() => console.log("Selected Users:", selectedUsers)}
            >
                Create Group
            </button>
        </div>
    );
};

export default CreateProject;
