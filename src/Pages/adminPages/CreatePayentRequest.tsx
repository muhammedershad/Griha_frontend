import { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import Form, { FormField } from "../../components/common/Form";
import api from "../../Services/api";
import User from "../../interfaces/user";
import MembersList from "../../components/common/MembersList";
import Spinner from "../../components/common/Spinner";
import projectApi from "../../Services/apis/projectApi";
import toast from "react-hot-toast";
import paymentApi from "../../Services/apis/paymentApi";
import { useNavigate } from "react-router-dom";
import { Project } from "../../interfaces/project";

interface FormData {
    purpose: string;
    amount: number;
}

const CreatePayentRequest = () => {
    const [formData, setFormData] = useState<FormData>();
    const [allClients, setAllClients] = useState<User[]>();
    const [selectedClient, setSelectedClient] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState<string>();
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await api.allClients();
            if (response.success) setAllClients(response.allClients);
        })();
    }, []);

    useEffect(() => {
        console.log(selectedClient[0]);
        if (selectedClient.length > 0) {
            (async () => {
                const response = await projectApi.userProjects(
                    selectedClient[0]
                );
                console.log(response);
                if (response.success) {
                    setAllProjects(response.projects);
                }
            })();
        }
    }, [selectedClient]);

    useEffect(() => {
        if (formData) handlePaymentCreation();
    }, [formData]);

    const handlePaymentCreation = async () => {
        let error = false;
        if (!formData?.purpose?.trim()) {
            toast.error("Enter payment description");
            error = true; // Fix the typo here
        }

        if (!formData?.amount) {
            toast.error("Enter amount");
            error = true;
        }
        if (selectedClient.length === 0) {
            toast.error("Select the Client");
            error = true;
        }
        // if(!selectedProject?.trim()) {
        //     toast.error('Select the project')
        //     error = true
        // }
        if (error) return;

        const data = {
            paidBy: selectedClient[0],
            paidTo: "65902c04815fa9ffc9aaf1d0",
            purpose: formData?.purpose,
            paymentType: "debit",
            status: "pending",
            amount: formData?.amount,
            project: selectedProject || allProjects[0] || "",
        };

        const response = await paymentApi.createPaymentRequest(data);
        if (response.success) {
            toast.success(response.message);
            navigate("/admin/payments");
        }
    };

    const handleClientSelect = (userId: string) => {
        if (selectedClient.includes(userId)) {
            setSelectedClient(selectedClient.filter((id) => id !== userId));
        } else {
            setSelectedClient([userId]);
        }
    };

    const formFields: FormField[] = [
        {
            placeholder: "Payment Description",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "purpose",
        },
        {
            placeholder: "Amount",
            type: "number",
            defaultValue: "",
            isRequired: true,
            data: "amount",
        },
    ];
    return (
        <>
            <MainDash>
                {!allClients ? (
                    <Spinner />
                ) : (
                    <div className="flex w-full justify-center">
                        <div className="max-w-[600px] p-4 bg-slate-800 rounded-md">
                            <h3 className="font-semibold font-sans text-center tracking-wider m-5 text-lg">
                                Create Payment Request
                            </h3>
                            <Form obj={formFields} setData={setFormData}>
                                <label
                                    htmlFor=""
                                    className="flex mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                                >
                                    Select Employee
                                </label>
                                <MembersList
                                    users={allClients}
                                    selectedUsers={selectedClient}
                                    onUserSelect={handleClientSelect}
                                    heading={""}
                                />

                                <div className="relative h-10 w-full min-w-[200px]">
                                    <select
                                        onChange={(event) => {
                                            setSelectedProject(
                                                event.target.value
                                            );
                                        }}
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-600"
                                    >
                                        {allProjects?.map((project) => (
                                            <option
                                                className="bg-gray-500"
                                                value={project?._id}
                                            >
                                                {project?.projectName}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Select Project
                                    </label>
                                </div>
                                {/* <div className="relative h-10 w-full min-w-[200px]">
                        <select
                        onChange={(event) => {
                            setCategory(event.target.value);
                          }}
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-600">
                            {
                                allProjects?.progress?.map(project => (<option
                                    className="bg-gray-500"
                                    value="Residential"
                                >
                                    {project?.projectName}
                                </option>))
                            }
                            
                        </select>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                            Select Project Progress
                        </label>
                    </div> */}

                                {/* <div className="w-full">
                        <div className="relative w-full min-w-[200px]">
                            <textarea
                                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-gray-600"
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
                    </div> */}
                                {/* <div className="m-0 text-sm text-slate-400">
                        <p>
                            If you require a line break or paragraph
                            break in project details, type {"'{<br/>}'"}.
                        </p>
                    </div> */}

                                {/* <div className="flex w-full justify-center">
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
                    </div> */}
                            </Form>
                        </div>
                        <div></div>
                    </div>
                )}
            </MainDash>
        </>
    );
};

export default CreatePayentRequest;
