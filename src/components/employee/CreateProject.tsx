import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import Form from "../common/Form";
import MembersList from "../common/MembersList";
import { employeeApi } from "../../Services/employeeApi";
import api from "../../Services/api";
import User from "../../interfaces/user";
import { Employees } from "../../interfaces/employee";
import projectApi from "../../Services/apis/projectApi";
import { ProjectForm, project } from "../../interfaces/project";
import toast from "react-hot-toast";
import { trimProjectFormData } from "../../Services/trim";
import { validations } from "../../Services/validations";
import { useAppSelector } from "../../Services/redux/hooks";

const CreateProject = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<ProjectForm>();
    const [allEmployees, setAllEmployees] = useState<Employees[]>();
    const [clients, setClients] = useState<User[]>();
    const employee = useAppSelector((state) => state.employee.employee);

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
        console.log(formData,'formdata', selectedUsers,'selected users', selectedEmployees, 'selected employees');
        if (formData) {
            CreateProject()
        }
    }, [formData]);

    const CreateProject = async () => {
        let err = false;
        if (formData) setFormData(trimProjectFormData(formData))
        if (!formData?.address || !validations.validateAddress(formData.address)) {
            toast.error('Enter valid address')
            err = true
        }
        if (!formData?.district) {
            toast.error('Enter valid district')
            err = true
        }
        if (!formData?.longitudeAndLatitude) {
            toast.error('Enter valid Longitude and Latitude')   
            err = true
        }
        if (!formData?.pincode || !validations.validatePINCode(formData.pincode)) {
            toast.error('Enter valid Pincode')
            err = true
        }
        if (!formData?.state) {
            toast.error('Enter Valid State')
            err = true
        }
        if ( err ) return

        if ( formData && employee ) {
            const data: project = {
                projectName: formData?.projectName,
                postedBy: employee?._id,
                clients: selectedUsers,
                details: formData.district,
                location: formData.longitudeAndLatitude,
                team : {
                    members: selectedEmployees,
                    teamLead: employee?._id
                },
                address: {
                    address: formData.address,
                    district: formData.district,
                    state: formData.state,
                    pincode: formData.pincode
                },
            }
            const response = await projectApi.createProject( data )
            if ( response.success ) {
                toast.success('Project created')
                closeModal()
            }   
        }
    }

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
            placeholder: "Site Address",
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
            data: "pincode",
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
                        <label htmlFor="" className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white" >
                            Select Team Members
                        </label>
                        <MembersList
                            users={allEmployees}
                            selectedUsers={selectedEmployees}
                            onUserSelect={handleEmployeeSelect}
                        />
                        <label htmlFor="" className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white" >
                            Select Clients
                        </label>
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