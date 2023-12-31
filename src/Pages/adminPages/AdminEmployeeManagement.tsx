import { Button } from "flowbite-react";
import MainDash from "../../components/common/MainDash";
import DarkThemedModal from "../../components/common/Modal";
import { useState } from "react";

const AdminEmployeeManagement = () => {
    const handleAddEmployee = () => {
        console.log("hii");
    };


    return (
        <>
            <MainDash>
                <div className="flex flex-row justify-between">
                    <h3 className="font-semibold font-sans tracking-wider m-5 text-lg">
                        Employees
                    </h3>
                </div>
            </MainDash>
        </>
    );
};

export default AdminEmployeeManagement;
