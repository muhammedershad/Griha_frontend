import { Button } from "flowbite-react";
import MainDash from "../../components/common/MainDash";
import { Modal } from "../../components/common/Modal";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Employees, EmployeesForm } from "../../interfaces/employee";
import toast from "react-hot-toast";
import { validations } from "../../Services/validations";
import api from "../../Services/api";
import Swal from "sweetalert2";

const AdminEmployeeManagement = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm<EmployeesForm>();
    const [employees, setEmployees] = useState<Employees[]>([]);
    const [change, setChange] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allEmployees = await api.allEmployees();
                console.log(allEmployees);
                setEmployees(allEmployees?.allEmployees);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [change]);

    const filteredEmployees = employees.filter((employee) =>
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Change page
    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChangeEmployeeBlock = (employeeId: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: "rgb(44,48,58)",
            customClass: {
                title: "swal-text-white", // Add this class to style the title
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await api.blockEmployee(employeeId);
                // console.log(response);
                if (response?.success) {
                    toast.success(response.message);
                    setChange(!change);
                } else {
                    toast.error("Error in employee role change");
                }
            } else return;
        });
    };

    const handleChangeEmployeeRole = (employeeId: string) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            background: "rgb(44,48,58)",
            customClass: {
                title: "swal-text-white", // Add this class to style the title
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await api.employeeRoleChange(employeeId);
                console.log(response);
                if (response?.success) {
                    toast.success("Employee role changed");
                    setChange(!change);
                } else {
                    toast.error("Error in employee role change");
                }
            } else return;
        });
    };

    const submitForm = async (data: EmployeesForm) => {
        if (!data.department.trim()) {
            toast.error("Enter valid deparment");
        }
        if (!data.email.trim() || validations.validateEmail(data.email)) {
            toast.error("Enter valid email");
        }
        if (!data.jobRole.trim()) {
            toast.error("Enter valid job role");
        }
        if (!data.firstName.trim()) {
            toast.error("Enter valid name");
        }
        if (data.password.trim().length < 6) {
            toast.error("Enter valid password");
        }
        if (
            !data.department.trim() ||
            !data.email.trim() ||
            validations.validateEmail(data.email) ||
            !data.jobRole.trim() ||
            !data.jobRole.trim() ||
            !data.firstName.trim() ||
            data.password.trim().length < 6
        )
            return;

        const response = await api.addEmployee(data);
        if (response?.success) {
            toast.success(response?.message);
            closeModal();
        } else {
            toast.error(response?.message);
        }
    };

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
                                {...register("firstName")}
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
                            Add Employee
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
                <div className="flex flex-row justify-between align-middle items-center">
                    <h3 className="font-semibold align-middle font-sans tracking-wider m-5 text-lg">
                        Employees
                    </h3>
                    <input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className="bg-gray-50 border w-2/6 h-10 border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by name..."
                        required
                    />
                    <Button onClick={openModal}> Add Employee </Button>
                </div>
                <table className="min-w-full divide-y mb-8 divide-gray-800 overflow-x-auto rounded-3xl border-collapse">
                    <thead className="bg-gray-900 rounded-lg">
                        <tr>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Joined Date
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Job Role
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Department
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {currentItems.map((employee) => (
                        <tbody
                            key={employee._id}
                            className="bg-gray-800 divide-y divide-gray-200"
                        >
                            <tr>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src="https://i.pravatar.cc/150?img=1"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-200">
                                                {
                                                    employee?.firstName + " "
                                                    // employee.lastName
                                                }
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {employee.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {employee.email}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {employee.joinedDate.split("T")[0]}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {employee.jobRole}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {employee.department}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="text-base text-gray-400">
                                        {employee.phone}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                        onClick={() =>
                                            handleChangeEmployeeRole(
                                                employee._id
                                            )
                                        }
                                    >
                                        {employee.isSenior
                                            ? "Make Junior"
                                            : "Make Senior"}
                                    </a>
                                    <a
                                        onClick={() =>
                                            handleChangeEmployeeBlock(
                                                employee._id
                                            )
                                        }
                                        href="#"
                                        className="ml-2 text-red-600 hover:text-red-900"
                                    >
                                        {employee.isBlocked
                                            ? "Unblock"
                                            : "Block"}
                                    </a>
                                </td>
                            </tr>

                            {/* More rows... */}
                        </tbody>
                    ))}
                </table>
                <div className="pagination">
                    {Array.from({
                        length: Math.ceil(filteredEmployees.length / itemsPerPage),
                    }).map((_, index) => (
                        <>
                            {/* <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button> */}
                            <a
                                onClick={() => paginate(index + 1)}
                                key={index + 1}
                                className="items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {index + 1}
                            </a>
                        </>
                    ))}
                </div>
            </MainDash>
        </>
    );
};

export default AdminEmployeeManagement;
