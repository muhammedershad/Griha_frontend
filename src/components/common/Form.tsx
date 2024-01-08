import React from "react";
import { useForm, } from "react-hook-form";

export interface FormField {
    placeholder: string;
    type: string;
    defaultValue: string | undefined | number;
    isRequired: boolean;
    data: string
}

interface FormProps {
    obj: FormField[];
    setData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const Form: React.FC<FormProps> = ({ obj, setData }) => {
    const { register, handleSubmit } = useForm();

    return (
        <div>
            <form 
            onSubmit={handleSubmit((data) => {
                setData(JSON.parse(JSON.stringify(data)));
            })} className="flex flex-col gap-4">
                {obj.map((field, index) => (
                    <div key={index}>
                        <label
                            htmlFor={field.placeholder}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                        />
                    </div>
                ))}
                <button
                 className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {"Update"}
                </button>
            </form>
        </div>
    );
};

export default Form;


