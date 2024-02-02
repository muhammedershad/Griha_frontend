import React, { useEffect, useState } from "react";
import {
    EditProjectDetails,
    ProjectForm,
    project,
} from "../../interfaces/project";
import { Modal } from "./Modal";
import Form from "./Form";
import { trimProjectFormData } from "../../Services/trim";
import { validations } from "../../Services/validations";
import toast from "react-hot-toast";
import projectApi from "../../Services/apis/projectApi";
import MembersList from "./MembersList";
import { Employees } from "../../interfaces/employee";
import { employeeApi } from "../../Services/employeeApi";
import { useAppSelector } from "../../Services/redux/hooks";
import User from "../../interfaces/user";
import api from "../../Services/api";
import { Link } from "react-router-dom";

interface Props {
    project: project | null;
    setProject: (project: project) => void;
}

const ProjectHeader: React.FC<Props> = ({ project, setProject }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<ProjectForm>();
    const [allSeniors, setAllSeniors] = useState<Employees[]>([]);
    const [allClients, setAllClients] = useState<User[]>([]);
    const [allEmployees, setAllEmployees] = useState<Employees[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [selectedTeamLead, setSelectedTeamLead] = useState<string[]>([]);
    const employee = useAppSelector((state) => state.employee.employee);

    useEffect(() => {
        (async () => {
            const response = await employeeApi.allSeniorEmployees();
            if (response) setAllSeniors(response?.allSeniors);

            const allEmployeeResponse = await employeeApi.allEmployees();
            if (allEmployeeResponse)
                setAllEmployees(allEmployeeResponse?.allEmployees);

            const allClientsResponse = await api.allClients();
            if (allClientsResponse)
                setAllClients(allClientsResponse.allClients);
        })();
        if (project?.team?.teamLead) {
            setSelectedTeamLead([project?.team?.teamLead?._id]);
        }
        if (project?.clients) {
            const clintsId: React.SetStateAction<string[]> = [];
            project.clients.forEach((client: User) =>
                clintsId.push(client._id)
            );
            setSelectedClients(clintsId);
        }
        if (project?.team?.members) {
            const emplyeesId: string[] = [];
            project.team.members.forEach((employee: Employees) =>
                emplyeesId.push(employee?._id)
            );
            setSelectedEmployees(emplyeesId);
        }
    }, [project]);

    const handleTeamLeadSelect = (userId: string) => {
        if (selectedTeamLead.includes(userId)) {
            setSelectedTeamLead(selectedTeamLead.filter((id) => id !== userId));
        } else {
            setSelectedTeamLead([userId]);
        }
    };

    const handleClientsSelect = (userId: string) => {
        if (selectedClients.includes(userId)) {
            setSelectedClients(selectedClients.filter((id) => id !== userId));
        } else {
            setSelectedClients([...selectedClients, userId]);
        }
    };

    const handleEmployeeSelect = (userId: string) => {
        if (selectedEmployees.includes(userId)) {
            setSelectedEmployees(
                selectedEmployees.filter((id) => id !== userId)
            );
        } else {
            setSelectedEmployees([...selectedEmployees, userId]);
        }
    };

    useEffect(() => {
        console.log(formData, "formdata", selectedTeamLead);
        if (formData) {
            editProject();
        }
    }, [formData]);

    const editProject = async () => {
        let err = false;
        if (formData) setFormData(trimProjectFormData(formData));

        if (!formData?.projectName) {
            toast.error("Enter valid project name");
            err = true;
        }
        if (
            !formData?.address ||
            !validations.validateAddress(formData.address)
        ) {
            toast.error("Enter valid address");
            err = true;
        }
        if (!formData?.district) {
            toast.error("Enter valid district");
            err = true;
        }
        if (!formData?.longitudeAndLatitude) {
            toast.error("Enter valid Longitude and Latitude");
            err = true;
        }
        if (
            !formData?.pincode ||
            !validations.validatePINCode(formData.pincode)
        ) {
            toast.error("Enter valid Pincode");
            err = true;
        }
        if (!formData?.state) {
            toast.error("Enter Valid State");
            err = true;
        }
        if (err) return;

        if (formData) {
            const data: EditProjectDetails = {
                projectName: formData?.projectName,
                location: formData.longitudeAndLatitude,
                teamLead: selectedTeamLead[0],
                teamMembers: selectedEmployees,
                clients: selectedClients,
                address: {
                    address: formData.address,
                    district: formData.district,
                    state: formData.state,
                    pincode: formData.pincode,
                },
            };
            if (project?._id) {
                const response = await projectApi.editProject(
                    project?._id,
                    data
                );
                if (response.success) {
                    toast.success("Project edited successfully");
                    setProject(response?.project);
                    closeModal();
                }
            }
        }
    };

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
            defaultValue: project?.projectName,
            isRequired: true,
            data: "projectName",
        },
        {
            placeholder: "Site Address",
            type: "text",
            defaultValue: project?.address?.address,
            isRequired: true,
            data: "address",
        },
        {
            placeholder: "District",
            type: "text",
            defaultValue: project?.address?.district,
            isRequired: true,
            data: "district",
        },
        {
            placeholder: "State",
            type: "text",
            defaultValue: project?.address?.state,
            isRequired: true,
            data: "state",
        },
        {
            placeholder: "Pin Code",
            type: "number",
            defaultValue: project?.address?.pincode,
            isRequired: true,
            data: "pincode",
        },
        {
            placeholder: "Project Deails",
            type: "string",
            defaultValue: project?.location,
            isRequired: true,
            data: "longitudeAndLatitude",
        },
    ];

    return (
        <>
            <Modal
                mainHeading="Edit Project"
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div className=" space-y-1 md:space-y-4 sm:p-3">
                    <Form obj={formFields} setData={setFormData}>
                        <label
                            htmlFor=""
                            className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                        >
                            Change Team Lead
                        </label>
                        <MembersList
                            users={allSeniors}
                            selectedUsers={selectedTeamLead}
                            onUserSelect={handleTeamLeadSelect}
                        />
                        <label
                            htmlFor=""
                            className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                        >
                            Edit Team Members
                        </label>
                        <MembersList
                            users={allEmployees}
                            selectedUsers={selectedEmployees}
                            onUserSelect={handleEmployeeSelect}
                        />
                        <label
                            htmlFor=""
                            className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                        >
                            Edit Clients
                        </label>
                        <MembersList
                            users={allClients}
                            selectedUsers={selectedClients}
                            onUserSelect={handleClientsSelect}
                            heading={undefined}
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
            <div className="m-5">
                <div className="flex flex-row justify-between align-middle items-center">
                    <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                        {project?.projectName}
                    </h2>

                    {/* <SmallButton  title="Create Project" /> */}
                    {employee?._id === project?.team?.teamLead?._id && (
                        <div className="flex gap-5">
                            <Link to={`/employee/create-task/${project?._id}`}>
                            <p
                                className="text-sm p-2 rounded-lg border-[1px]"
                            >
                                Create Task
                            </p>
                            </Link>
                            <p
                                onClick={openModal}
                                className="text-sm p-2 rounded-lg border-[1px]"
                            >
                                Edit Project
                            </p>
                        </div>
                    )}
                </div>
                <div className="pl-5 pt-2">
                    <div className="flex items-center max-w-1/2 my-2">
                        <div className="flex items-center w-32">
                            <p className="text-md">Project Name</p>
                            <span className="text-md mx-1">{": "}</span>
                        </div>
                        <p className="text-md">{project?.projectName}</p>
                    </div>

                    <div className="flex items-center max-w-1/2 my-2">
                        <div className="flex items-center w-32">
                            <p className="text-md">Address</p>
                            <span className="text-md mx-1">{": "}</span>
                        </div>
                        <p className="text-md">{`${project?.address?.address}, ${project?.address?.district}, ${project?.address?.state}, ${project?.address?.pincode}`}</p>
                    </div>
                    <div className="flex items-center max-w-1/2 my-2">
                        <div className="flex items-center w-32">
                            <p className="text-md">Project Details</p>
                            <span className="text-md mx-1">{": "}</span>
                        </div>
                        <p className="text-md">{project?.location}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectHeader;
