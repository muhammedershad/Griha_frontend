import { Button } from "flowbite-react";
import MainDash from "../../components/common/MainDash";
import { Modal } from "../../components/common/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EmployeesForm } from "../../interfaces/employee";
import toast from "react-hot-toast";
import { validations } from "../../Services/validations";

const AdminEmployeeManagement = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm<EmployeesForm>();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitForm = (data: EmployeesForm ) => {
        if ( !data.department.trim() ) {
            toast.error("Enter valid deparment")
        }
        if ( !data.email.trim() || validations.validateEmail(data.email) ) {
            toast.error('Enter valid email')
        }
        if ( !data.jobRole.trim() ) {
            toast.error("Enter valid job role")
        }
        if ( !data.name.trim() ) {
            toast.error("Enter valid name")
        }
        if ( data.password.trim().length < 6 ) {
            toast.error("Enter valid password")
        }
        if ( !data.department.trim() || !data.email.trim() || validations.validateEmail(data.email) || !data.jobRole.trim() || !data.jobRole.trim() || !data.name.trim() || data.password.trim().length < 6  ) return
        
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className=" space-y-1 md:space-y-4 sm:p-3">
                    <form
                        className="space-y-2 md:space-y-6"
                        onSubmit={handleSubmit((data) => {
                            setData(JSON.parse(JSON.stringify(data)));
                            submitForm(data);
                        })}
                    >
                        <div>
                            <input
                                type="text"
                                {...register("name")}
                                className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                {...register("email")}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register("jobRole")}
                                id="jobRole"
                                className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Job Role"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register("department")}
                                id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Department"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                {...register("password")}
                                id="password"
                                placeholder="Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Login
                        </button>
                    </form>
                    <button
                        onClick={closeModal}
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-[#8e1c1c] to-[#422c34] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                        cancel
                    </button>
                </div>
            </Modal>
            <MainDash>
                <div className="flex flex-row justify-between">
                    <h3 className="font-semibold font-sans tracking-wider m-5 text-lg">
                        Employees
                    </h3>
                    <Button onClick={openModal}> Add Employee </Button>
                </div>
            </MainDash>
        </>
    );
};

export default AdminEmployeeManagement;
