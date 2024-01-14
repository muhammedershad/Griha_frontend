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

interface Props {
    project: project | null;
    setProject: (project: project) => void;
}

const ProjectHeader: React.FC<Props> = ({ project, setProject }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<ProjectForm>();
    const [allSeniors, setAllSeniors] = useState<Employees[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const employee = useAppSelector((state) => state.employee.employee);

    useEffect(() => {
        (async () => {
            const response = await employeeApi.allSeniorEmployees();
            if (response) setAllSeniors(response?.allSeniors);
            // Check if project.team.lead is available before setting selectedEmployees
        })();
        if (project?.team?.teamLead) {
            setSelectedEmployees([project?.team?.teamLead]);
        }
    }, [project]);

    const handleEmployeeSelect = (userId: string) => {
        if (selectedEmployees.includes(userId)) {
            setSelectedEmployees(
                selectedEmployees.filter((id) => id !== userId)
            );
        } else {
            setSelectedEmployees([userId]);
        }
    };

    useEffect(() => {
        console.log(formData, "formdata", selectedEmployees);
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
                teamLead: selectedEmployees[0],
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
        // setSelectedEmployees([])
        // setSelectedEmployees([])
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
            placeholder: "Location Longitude and Latitude",
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
                            selectedUsers={selectedEmployees}
                            onUserSelect={handleEmployeeSelect}
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
                    {employee?._id === project?.team?.teamLead && <p onClick={openModal}>edit project</p>}
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
                            <p className="text-md">Project Name</p>
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
