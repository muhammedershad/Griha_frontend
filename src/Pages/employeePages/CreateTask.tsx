import React, { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import Form, { FormField } from "../../components/common/Form";
import { ProjectForm, project } from "../../interfaces/project";
import uploadImageToFirebase from "../../Services/firebase/imageUploader";
import toast from "react-hot-toast";
import { featuredProjects } from "../../interfaces/featuredProject";
import projectApi from "../../Services/apis/projectApi";
import ImagePreviewList from "../../components/common/ImagePreview";
import DragAndDrop from "../../components/common/DragAndDrop";
import { useParams } from "react-router-dom";

function CreateTask() {
    const [formData, setFormData] = useState<featuredProjects>();
    const [details, setDetails] = useState<string>("");
    const [category, setCategory] = useState<string>('Residential')
    const [files, setFiles] = useState<[]>([]);
    // const [imageUrls, setImageUrls] = useState<string[]>([])
    const { projectId } = useParams<{ projectId: string }>();
    const [project , setProject] = useState<project>()

    useEffect(() => {
        (async() => {
            if(projectId) {
                const response = await projectApi.projectDetails(projectId)
                console.log(response)
                if(response.success) setProject(response?.project)
            }
        })()
    },[projectId])

    useEffect(() => {
        if(formData) handleAddProject(formData)
    }, [formData]);

    const handleAddProject = async (formData: featuredProjects) => {
        let error: boolean = false;
        if(!formData.projectName.trim()) {
            toast.error('Invalid project name')
            error = true;
        }
        if(!formData.client.trim()) {
            toast.error('Invalid Client name')
            error = true
        }
        if(!formData.location.trim()) {
            toast.error('Invalid project location')
            error = true
        }
        if(!formData.builtupArea.trim()) {
            toast.error('Invalid builtup area')
            error = true
        }
        if(!formData.siteArea.trim()) {
            toast.error('Invalid site area')
            error = true
        }
        if(!category.trim()) {
            toast.error('Invalid cateogory')
            error = true
        }
        if(!details.trim()) {
            toast.error('Enter project details')
            error = true
        }
        if(error) return

        const imageUrls = await uploadImageToFirebase(files, 'featured_projects/')
        if (!imageUrls) return toast.error('Error in uploadin images')
        
        const data: featuredProjects = {...formData, details: details, category: category, images: imageUrls}
        const response = await projectApi.addFeatruedProjects(data)
        if (response.success) toast.success('Project addition completed successfully.')
    }

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
        {
            placeholder: "Details",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "details",
        },
        {
            placeholder: "Location",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "location",
        },
        {
            placeholder: "Builtup Area",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "builtupArea",
        },
        {
            placeholder: "YouTube Video Link",
            type: "text",
            defaultValue: "",
            isRequired: false,
            data: "youtubeLink",
        },
    ];
    
    return (
        <>
            <EmployeeSideBar>
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
                                    {'Project Name'}
                                    </label>
                                </div>
                            </div>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <select
                                onChange={(event) => {
                                    setCategory(event.target.value);
                                  }}
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-1 disabled:bg-gray-600">
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
                                    break in project details, type {"'{<br/>}'"}.
                                </p>
                            </div>
                            <input type="date" onChange={(e) => console.log(e.target.value) } />
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
            </EmployeeSideBar>
        </>
    );
}

export default CreateTask;
