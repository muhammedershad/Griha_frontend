import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ProjectForm } from "../../interfaces/project";

export interface FormField {
    placeholder: string;
    type: string;
    defaultValue: string | undefined | number;
    isRequired: boolean;
    data: string;
}

interface FormProps {
    obj: FormField[];
    setData: (something: FormData | ProjectForm) => void;
    children?: ReactNode;
}

const Form: React.FC<FormProps> = ({ obj, setData, children }) => {
    const { register, handleSubmit } = useForm();

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                    setData(JSON.parse(JSON.stringify(data)));
                })}
                className="flex flex-col gap-4"
            >
                {obj.map((field, index) => (
                    <div key={index}>
                        {/* <label
                            htmlFor={field.placeholder}
                            className="flex block mb-2 text-sm justify-start font-medium text-gray-900 dark:text-white"
                        >
                            {field.placeholder}
                        </label>
                        <input
                            type={field.type}
                            {...register(field.data, {
                                required: field.isRequired,
                            })}
                            placeholder={field.placeholder}
                            defaultValue={field.defaultValue}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={field.isRequired}
                        /> */}
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                className="peer h-full w-full rounded-[7px] border border-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-600 placeholder-shown:border-t-white focus:border-2 focus:border-gray-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                {...register(field.data, {
                                    required: field.isRequired,
                                })}
                                type={field.type}
                                defaultValue={field.defaultValue}
                                required={field.isRequired}
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                                {field.placeholder || ""}
                            </label>
                        </div>
                    </div>
                ))}
                {children}

                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {"Update"}
                </button>
            </form>
        </div>
    );
};

export default Form;
