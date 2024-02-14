import { useEffect, useState } from "react";
import { Employees } from "../../interfaces/employee";
import { useAppSelector } from "../../Services/redux/hooks";
import ChangePassword from "./ChangePassword";
import PersonalInfomations from "./PersonalInfomations";

const EmployeePersonalInformation = () => {
    const [employee, setEmployee] = useState<Employees>();
    const [info, setInfo] = useState<string>("info");
    const employeeData:Employees = useAppSelector((state) => state.employee.employee)!;
    useEffect(() => {
        if(employeeData) {
            setEmployee(employeeData);
        }
        // console.log(employee)
    },[employeeData]);

    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                {info === "info" ? (
                    <PersonalInfomations employee={employee!} />
                ) : (
                    <ChangePassword employee={employee} />
                )}
                <div className="flex justify-between mt-5">
                    <span
                        onClick={() => setInfo("info")}
                        className="text-stone-300 cursor-pointer"
                    >
                        Edit Informations
                    </span>
                    <span
                        onClick={() => setInfo("changePass")}
                        className="text-stone-300 cursor-pointer"
                    >
                        Change Password
                    </span>
                </div>
            </div>
        </>
    );
};

export default EmployeePersonalInformation;
