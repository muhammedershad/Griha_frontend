import { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import { featuredProjects } from "../../interfaces/featuredProject";
import { useParams } from "react-router-dom";
import projectApi from "../../Services/apis/projectApi";
import toast from "react-hot-toast";
import uploadImageToFirebase from "../../Services/firebase/imageUploader";
import Form, { FormField } from "../../components/common/Form";
import DragAndDrop from "../../components/common/DragAndDrop";
import ImagePreviewList from "../../components/common/ImagePreview";

function EditFeaturedProject() {
    const [formData, setFormData] = useState<featuredProjects>();
    const [details, setDetails] = useState<string>("");
    const [category, setCategory] = useState<string>("Residential");
    const [files, setFiles] = useState<(Blob | MediaSource)[]>([]);
    const [project, setProject] = useState<featuredProjects>();
    // const [imageUrls, setImageUrls] = useState<string[]>([])
    const { projectId } = useParams<{ projectId: string }>();
    useEffect(() => {
        const fetchProjectDetials = async () => {
            if (projectId) {
                const response = await projectApi.featuredProjectDetails(
                    projectId
                );
                if (response?.data.success) {
                    console.log(response.data.projectDetails);
                    setProject(response?.data?.projectDetails);
                    setCategory(response?.data?.projectDetails?.category);
                    setDetails(response?.data?.projectDetails?.details);
                }
            }
        };
        fetchProjectDetials();
    }, []);

    useEffect(() => {
        if (formData) handleAddProject(formData);
    }, [formData]);

    const handleAddProject = async (formData: featuredProjects) => {
        let error: boolean = false;
        if (!formData.projectName.trim()) {
            toast.error("Invalid project name");
            error = true;
        }
        if (!formData.client.trim()) {
            toast.error("Invalid Client name");
            error = true;
        }
        if (!formData.location.trim()) {
            toast.error("Invalid project location");
            error = true;
        }
        if (!formData.builtupArea.trim()) {
            toast.error("Invalid builtup area");
            error = true;
        }
        if (!formData.siteArea.trim()) {
            toast.error("Invalid site area");
            error = true;
        }
        if (!category.trim()) {
            toast.error("Invalid cateogory");
            error = true;
        }
        if (!details.trim()) {
            toast.error("Enter project details");
            error = true;
        }
        if (error) return;

        let imageUrls: string[] = [];
        if (files.length > 0) {
            imageUrls = await uploadImageToFirebase(
                files,
                "featured_projects/"
            );
            if (!imageUrls) return toast.error("Error in uploadin images");
        }

        const data: featuredProjects = {
            _id: project?._id,
            ...formData,
            details: details,
            category: category,
            images: [...imageUrls, ...project?.images!],
        };

        const response = await projectApi.updateFeatruedProjects(data);
        if (response.success) {
            toast.success("Project addition completed successfully.");
            setProject(response.project);
        }
    };

    const formFields: FormField[] = [
        {
            placeholder: "Project Name",
            type: "text",
            defaultValue: project?.projectName || "",
            isRequired: true,
            data: "projectName",
        },
        {
            placeholder: "Client",
            type: "text",
            defaultValue: project?.client || "",
            isRequired: true,
            data: "client",
        },
        {
            placeholder: "Site Area",
            type: "text",
            defaultValue: project?.siteArea || "",
            isRequired: true,
            data: "siteArea",
        },
        {
            placeholder: "Location",
            type: "text",
            defaultValue: project?.location || "",
            isRequired: true,
            data: "location",
        },
        {
            placeholder: "Builtup Area",
            type: "text",
            defaultValue: project?.builtupArea || "",
            isRequired: true,
            data: "builtupArea",
        },
        {
            placeholder: "YouTube Video Link",
            type: "text",
            defaultValue: project?.youtubeLink || "",
            isRequired: false,
            data: "youtubeLink",
        },
    ];

    const removeImage = (index: number) => {
        const updatedImages: string[] = [...project?.images!];
        updatedImages.splice(index, 1);

        setProject({
            ...project!,
            images: updatedImages,
        });
    };

    return (
        <>
            <MainDash>
                <div className="flex w-full justify-center">
                    <div className="max-w-[600px] p-4 bg-slate-800 rounded-md">
                        <h3 className="font-semibold font-sans text-center tracking-wider m-5 text-lg">
                            Edit Publicly Accessible Project
                        </h3>
                        <Form obj={formFields} setData={setFormData}>
                            <div className="relative h-10 w-full min-w-[200px]">
                                <select
                                    value={category}
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                    }}
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 empty:!bg-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-600"
                                >
                                    <option
                                        className="bg-gray-500"
                                        value="Residential"
                                    >
                                        Residential
                                    </option>
                                    <option
                                        className="bg-gray-600"
                                        value="Commercial"
                                    >
                                        Commercial
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
                                        value="Hospitality"
                                    >
                                        Hospitality
                                    </option>
                                </select>

                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                    Select the category
                                </label>
                            </div>

                            <div className="w-full">
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
                            </div>
                            <div className="m-0 text-sm text-slate-400">
                                <p>
                                    If you require a line break or paragraph
                                    break in project details, type {"'{<br/>}'"}
                                    .
                                </p>
                            </div>

                            <div className="flex w-full justify-center">
                                <DragAndDrop
                                    files={files}
                                    setFiles={setFiles}
                                />
                            </div>
                            <div className="w-full">
                                {project?.images?.map((pic, index) => (
                                    <div
                                        key={index}
                                        className="relative inline-block"
                                    >
                                        <img
                                            className="w-20 h-20 mx-2 object-contain border border-gray-900"
                                            src={pic}
                                            alt={`Preview ${index + 1}`}
                                        />
                                        <span
                                            className="absolute top-[-15px] right-[-7px] cursor-pointer p-1"
                                            onClick={() => removeImage(index)}
                                        >
                                            &#10006;
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <ImagePreviewList
                                files={files}
                                setFiles={setFiles}
                            />
                        </Form>
                    </div>
                    <div></div>
                </div>
            </MainDash>
        </>
    );
}

export default EditFeaturedProject;
