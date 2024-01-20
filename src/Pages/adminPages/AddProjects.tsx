import React, { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import Form, { FormField } from "../../components/common/Form";

function AddProjects() {
    const [formData, setFormData] = useState();
    const [details, setDetails] = useState<string>('')

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const formFields: FormField[] = [
        {
            placeholder: "Project Name",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "projectName",
        },
        {
            placeholder: "Client",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "Client",
        },
        {
            placeholder: "Site Area",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "Site Area",
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
            data: "BuiltupArea",
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
            <MainDash>
                <h3 className="font-semibold font-sans tracking-wider m-5 text-lg">
                    Create a New Publicly Accessible Project
                </h3>
                <div>
                    <div>
                        <Form obj={formFields} setData={setFormData}>
                            <div className="w-full">
                                <div className="relative w-full min-w-[200px]">
                                    <textarea
                                        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-gray-600 focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-gray-600"
                                        placeholder=" "
                                        defaultValue={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                        Detials
                                    </label>
                                </div>
                            </div>
                            <div className="m-0 text-sm text-slate-400">
                                <p>If you require a line break or paragraph break in project details, type {'<br/>'}.</p>
                            </div>
                        </Form>
                    </div>
                    <div></div>
                </div>
            </MainDash>
        </>
    );
}

export default AddProjects;
