import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import SideHeading from "../../components/common/SideHeading";
import Date from "../../components/common/Date";

const EmployeeAvilableSlots = () => {
    return (
        <>
            <EmployeeSideBar>
                <div className="bg-slate-950 p-8">
                    <div className="flex justify-between align-middle">
                        <SideHeading title="Available Slots" />
                        <Date />
                    </div>
                    <button className="relative bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                        Delete
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-white p-1 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </EmployeeSideBar>
        </>
    );
};

export default EmployeeAvilableSlots;
