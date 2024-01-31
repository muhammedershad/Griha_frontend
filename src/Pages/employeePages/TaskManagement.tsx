import React from "react";
import Sidebar from "../../components/Home/SideBar";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { Link } from "react-router-dom";

function TaskManagement() {
    return (
        <>
            <EmployeeSideBar>
                <div className="p-10 text-xl">
                    <div className="flex justify-between">
                    <h3>Task Management</h3>
                    <Link to='/employee/create-task'>
                    <p className="text-sm p-2 max-w-[100px] text-center rounded-lg border-[1px]">
                        Create Task
                    </p></Link>
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
}

export default TaskManagement;
