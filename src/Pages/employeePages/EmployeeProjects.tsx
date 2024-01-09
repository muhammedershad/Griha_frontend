import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import CreateProject from "../../components/employee/CreateProject";

const EmployeeProjects = () => {
    
    return (
        <>
            
            <EmployeeSideBar>
                <div className="p-5">
                    <div className="flex flex-row justify-between align-middle items-center">
                        <h2 className="text-2xl font-semibold text-stone-200 pl-5 pt-5">
                            Projects
                        </h2>
                        {/* <SmallButton  title="Create Project" /> */}
                        <CreateProject />
                    </div>
                    <div>
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                                {/* Box for Project 1 */}
                                <div className="bg-gradient-to-r from-[#355394] to-[#02155c] p-6 rounded-md">
                                    <h3 className="text-lg font-semibold">
                                        Project 1
                                    </h3>
                                    {/* Other content for Project 1 */}
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                                {/* Box for Project 2 */}
                                <div className="bg-gradient-to-r from-[#23448d] to-[#02155c] p-6 rounded-md">
                                    <h3 className="text-lg font-semibold">
                                        Project 2
                                    </h3>
                                    {/* Other content for Project 2 */}
                                </div>
                            </div>
                            {/* Add more similar divs for additional projects as needed */}
                        </div>
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
};

export default EmployeeProjects;
