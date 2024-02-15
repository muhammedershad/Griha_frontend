import { useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import { Link } from "react-router-dom";
import Task from "../../components/common/Task";
import { useAppSelector } from "../../Services/redux/hooks";
import tasksApi from "../../Services/apis/tasks.api";
import { TaskPopulated } from "../../interfaces/taks";

function TaskManagement() {
    const employeeData = useAppSelector((state) => state.employee.employee);
    const [activeTasks, setActiveTasks] = useState<TaskPopulated[]>([]);
    const [needToReviewTasks, setNeedToReviewTasks] = useState<TaskPopulated[]>(
        []
    );
    const [completedTasks, setCompletedTasks] = useState<TaskPopulated[]>([]);
    useEffect(() => {
        (async () => {
            if (employeeData?._id) {
                const response = await tasksApi.tasksByEmployee(
                    employeeData?._id
                );
                console.log(response);
                if (response.success) {
                    // setTasks(response.tasks);
                    const active = [];
                    const review = [];
                    const completed = [];
                    for (let i = 0; i < response?.tasks.length; i++) {
                        if (response.tasks[i].status === "active")
                            active.push(response.tasks[i]);
                        else if (response.tasks[i].status === "needToReview")
                            review.push(response.tasks[i]);
                        else if (response.tasks[i].status === "completed")
                            completed.push(response.tasks[i]);
                    }
                    setActiveTasks(active);
                    setNeedToReviewTasks(review);
                    setCompletedTasks(completed);
                }
            }
        })();
    }, [employeeData]);
    // console.log(activeTasks, needToReviewTasks, completedTasks);
    return (
        <>
            <EmployeeSideBar>
                <div className="p-10 text-xl">
                    <div className="flex justify-between">
                        <h3>Task Management</h3>
                        <Link to="/employee/projects">
                            <p className="text-sm p-2 max-w-[100px] text-center rounded-lg border-[1px]">
                                Create Task
                            </p>
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-3 my-3">
                        <div className="md:w-1/3">
                            <h3 className="text-gray-300">In Progress</h3>
                            {activeTasks?.map((task) => (
                                <Task key={task?._id} task={task} />
                            ))}
                        </div>
                        <div className="md:w-1/3">
                            <h3 className="text-gray-300">Needs Review</h3>
                            {needToReviewTasks?.map((task: TaskPopulated) => (
                                <Task key={task?._id} task={task} />
                            ))}
                        </div>
                        <div className="md:w-1/3 ">
                            <h3 className="text-gray-300">Completed</h3>
                            {completedTasks?.map((task) => (
                                <Task key={task?._id} task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
}

export default TaskManagement;
