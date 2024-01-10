import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import Form from "../common/Form";
import MembersList from "../common/MembersList";
import { employeeApi } from "../../Services/employeeApi";
import api from "../../Services/api";
import User from "../../interfaces/user";
import { Employees } from "../../interfaces/employee";

const CreateProject = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fromData, setFormData] = useState();
    const [allEmployees, setAllEmployees] = useState<Employees[]>();
    const [clients, setClients] = useState<User[]>();

    useEffect(() => {
        (async () => {
            const response = await employeeApi.allEmployees();
            if (response?.success) setAllEmployees(response.allEmployees);
        })();
        (async () => {
            const response = await api.allClients();
            if (response?.success) setClients(response.allClients);
        })();
    }, []);

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleUserSelect = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const handleEmployeeSelect = (userId: string) => {
        if (selectedEmployees.includes(userId)) {
            setSelectedEmployees(selectedEmployees.filter((id) => id !== userId));
        } else {
            setSelectedEmployees([...selectedEmployees, userId]);
        }
    };

    useEffect(() => {
        console.log(fromData,'formdata', selectedUsers,'selected users', selectedEmployees, 'selected employees');
    }, [fromData, selectedUsers, selectedEmployees]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployees([])
        setSelectedEmployees([])
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
                        <MembersList
                            users={allEmployees}
                            selectedUsers={selectedEmployees}
                            onUserSelect={handleEmployeeSelect}
                        />
                        <MembersList
                            users={clients}
                            selectedUsers={selectedUsers}
                            onUserSelect={handleUserSelect}
                        />
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

export default CreateProject    