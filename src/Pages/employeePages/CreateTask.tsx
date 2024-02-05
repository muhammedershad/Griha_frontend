import React, { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import Form, { FormField } from "../../components/common/Form";
import { project } from "../../interfaces/project";
import uploadImageToFirebase from "../../Services/firebase/imageUploader";
import toast from "react-hot-toast";
import { featuredProjects } from "../../interfaces/featuredProject";
import projectApi from "../../Services/apis/projectApi";
import ImagePreviewList from "../../components/common/ImagePreview";
import DragAndDrop from "../../components/common/DragAndDrop";
import { useParams } from "react-router-dom";
import MembersList from "../../components/common/MembersList";
import { Employees } from "../../interfaces/employee";
import Spinner from "../../components/common/Spinner";
import { Tasks } from "../../interfaces/taks";
import { useAppSelector } from "../../Services/redux/hooks";
import tasksApi from "../../Services/apis/tasks.api";
import uploadOtherFilesToFirebase from "../../Services/firebase/otherFiles";

function CreateTask() {
    const [formData, setFormData] = useState<featuredProjects>();
    const [details, setDetails] = useState<string>("");
    const [department, setDepartment] = useState<string>("Architecture");
    const [priority, setPriority] = useState<string>("High");
    const [files, setFiles] = useState<[]>([]);
    // const [attachments, setAttachments] = useState<string[]>([])
    const [dueDate, setDueDate] = useState();
    const [allEmployees, setAllEmployees] = useState<Employees[] | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<string[]>([]);
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<project>();
    const today = new Date().toISOString().split("T")[0];
    const employeeData = useAppSelector((state) => state.employee.employee);

    useEffect(() => {
        (async () => {
            if (projectId) {
                const response = await projectApi.projectDetails(projectId);
                if (response.success) {
                    setProject(response?.project);
                    setAllEmployees(response?.project?.team?.members)
                }
            }
        })();
    }, [projectId]);

    useEffect(() => {
        if (formData) handleAddTask(formData);
    }, [formData]);

    const handleEmployeeLeadSelect = (userId: string) => {
        if (selectedEmployee.includes(userId)) {
            setSelectedEmployee(selectedEmployee.filter((id) => id !== userId));
        } else {
            setSelectedEmployee([userId]);
        }
    };

    interface FormData {
        taskName: string, 
        shortDescription: string
    }

    const handleAddTask = async (formData: FormData) => {
        console.log(formData, details, projectId, department, priority, selectedEmployee, dueDate);
        
        let error: boolean = false;
        if (!formData.taskName.trim()) {
            toast.error("Invalid task name");
            error = true;
        }
        if (!formData.shortDescription.trim()) {
            toast.error("Invalid short description");
            error = true;
        }
        if (!projectId) {
            toast.error("Project Id is not available");
            error = true;
        }
        if (!dueDate) {
            toast.error("Select due date");
            error = true;
        }
        if (!department.trim()) {
            toast.error("Select a valid department");
            error = true;
        }
        if (!priority.trim()) {
            toast.error("Select priority");
            error = true;
        }
        if (!details.trim()) {
            toast.error("Enter project details");
            error = true;
        }
        if (!selectedEmployee[0]) {
            toast.error("Select the employee want to assign");
            error = true;
        }
        if (error) return;

        let fileUrls = []
        if(files.length > 0) {
            fileUrls = await uploadOtherFilesToFirebase(
                files,
                "tasks_attachments/"
            );
            if (!fileUrls) return toast.error("Error in uploadin files");
        }

        const data: Tasks = {
            ...formData,
            details: details,
            department: department,
            attachments: fileUrls,
            assignedBy: employeeData?._id,
            dueDate: dueDate,
            assignedTo: selectedEmployee[0],
            project: projectId,
            priority
        };
        const response = await tasksApi.addTask(data);
        if (response.success)
            toast.success("Task added successfully");
    };

    const formFields: FormField[] = [
        {
            placeholder: "Task Name",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "taskName",
        },
        {
            placeholder: "Short Description",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "shortDescription",
        },
    ];

    return (
        <>
            <EmployeeSideBar>
                {
                    !allEmployees ? (<Spinner />) : (
                        <div className="flex w-full justify-center">
                    <div className="max-w-[600px] p-4 bg-slate-800 rounded-md">
                        <h3 className="font-semibold font-sans text-center tracking-wider m-5 text-lg">
                            Create New Task
                        </h3>
                        <Form obj={formFields} setData={setFormData}>
                            <div>
                                <div className="relative h-10 w-full min-w-[200px]">
                                    <input
                                        className="peer h-full w-full rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-white focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:bg-blue-gray-50"
                                        disabled
                                        defaultValue={project?.projectName}
                                        required
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:peer-placeholder-shown:text-white">
                                        {"Project Name"}
                                    </label>
                                </div>
                            </div>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <select
                                    onChange={(event) => {
                                        setDepartment(event.target.value);
                                    }}
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-600"
                                >
                                    <option
                                        className="bg-gray-500"
                                        value="Construction"
                                    >
                                        Construction
                                    </option>
                                    <option
                                        className="bg-gray-600"
                                        value="Architecture"
                                    >
                                        Architecture
                                    </option>
                                    <option
                                        className="bg-gray-500"
                                        value="Landscape"
                                    >
                                        Landscape
                                    </option>
                                    <option
                                        className="bg-gray-600"
                                        value="Interior"
                                    >
                                        Interior
                                    </option>
                                    <option
                                        className="bg-gray-500"
                                        value="3DVisualisation"
                                    >
                                        3D Visualisation
                                    </option>
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:peer-placeholder-shown:text-white">
                                    Select the category
                                </label>
                            </div>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <select
                                    onChange={(event) => {
                                        setPriority(event.target.value);
                                    }}
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-600"
                                >
                                    <option
                                        className="bg-gray-500"
                                        value="High"
                                    >
                                        High
                                    </option>
                                    <option
                                        className="bg-gray-600"
                                        value="Medium"
                                    >
                                        Medium
                                    </option>
                                    <option className="bg-gray-500" value="Low">
                                        Low
                                    </option>
                                </select>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:peer-placeholder-shown:text-white">
                                    Select the priority
                                </label>
                            </div>
                            <label
                                htmlFor=""
                                className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                            >
                                Select Employee
                            </label>
                            <MembersList
                                users={allEmployees}
                                selectedUsers={selectedEmployee}
                                onUserSelect={handleEmployeeLeadSelect}
                                heading={undefined}
                            />

                            <div className="w-full">
                                <div className="relative w-full min-w-[200px]">
                                    <textarea
                                        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:bg-gray-600"
                                        placeholder=" "
                                        defaultValue={details}
                                        onChange={(e) =>
                                            setDetails(e.target.value)
                                        }
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Detials
                                    </label>
                                </div>
                            </div>
                            <div className="m-0 text-sm text-slate-400">
                                <p>
                                    If you require a line break or paragraph
                                    break in project details, type {"'{<br/>}'"}
                                    .
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="date" className="text-sm mb-2">
                                    Selelct Due Date
                                </label>
                                <input
                                    type="date"
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min={today}
                                    className="bg-gray-800 text-white p-2 rounded border border-gray-600 outline-none"
                                />
                            </div>
                            <div className="flex w-full justify-center">
                                <DragAndDrop
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </div>
                            <div className="w-full">
                                <ImagePreviewList
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </div>
                        </Form>
                    </div>
                    <div></div>
                </div>
                    )
                }
            </EmployeeSideBar>
        </>
    );
}

export default CreateTask;
