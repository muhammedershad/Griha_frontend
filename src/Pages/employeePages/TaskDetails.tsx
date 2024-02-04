import React, { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { useParams } from "react-router-dom";
import tasksApi from "../../Services/apis/tasks.api";
import { Tasks } from "../../interfaces/taks";
import Comments from "../../components/common/Comments";
import UsersProfileCard from "../../components/common/UsersProfileCard";
import Spinner from "../../components/common/Spinner";

function TaskDetails() {
    const [task, setTask] = useState<Tasks>();
    const { taskId } = useParams<string>();
    useEffect(() => {
        (async () => {
            const response = await tasksApi.taskDetails(taskId);
            console.log(response?.task);
            if (response.success) setTask(response?.task);
        })();
    }, [taskId]);

    return (
        <EmployeeSideBar>
            {
                !task ? (<Spinner />) : (<div className="p-10">
                <h3 className="text-gray-200 text-xl font-bold">
                    {task?.taskName}
                </h3>
                <div className="text-sm flex my-2 text-gray-300 gap-5">
                <p>Assigned Date: 16/0/23</p>
                <p >Due Date: 15/02/23</p>
                </div>
                <div className="flex gap-5">
                    <div className="w-full md:w-2/3 my-5 ">
                        <div className="bg-slate-700">
                            <p>Task Details</p>
                            <p>{task?.details}</p>

                            <div>
                                assigned By
                                <div className="max-w-[500px]">
                                <UsersProfileCard user={task?.assignedBy} selectedUsers={""} onUserSelect={function (id: string | undefined): void {
                                    throw new Error("Function not implemented.");
                                } } edit={false} />
                                </div>
                            </div>
                            <div>
                                assigned To
                                <div className="max-w-[500px]">
                                <UsersProfileCard user={task?.assignedTo} selectedUsers={""} onUserSelect={function (id: string | undefined): void {
                                    throw new Error("Function not implemented.");
                                } } edit={false} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 my-5">
                        <p>Comments</p>
                        <Comments comments={[{
                            comment: 'something'
                        }]} />
                    </div>
                </div>
            </div>)
            }
        </EmployeeSideBar>
    );
}

export default TaskDetails;
