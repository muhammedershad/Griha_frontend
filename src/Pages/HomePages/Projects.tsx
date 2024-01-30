import { useEffect, useState } from "react";
import Navbar from "../../components/Home/Navbar";
import axios from "axios";
import { featuredProjects } from "../../interfaces/featuredProject";
import projectApi from "../../Services/apis/projectApi";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";

const Projects = () => {
    const [allProjects, setAllProjects] = useState<featuredProjects[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<string>('all')

    useEffect(() => {
        (async () => {
            const response = await projectApi.allFeaturedPorjects(category, '', 1);
            console.log(response, 'response');
            
            setAllProjects(response.allFeaturedProjects);
            setLoading(false)
        })();
    },[category]);
    return (
        <>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="md:mx-28 mt-28 text-white">
                        <div className="w-full flex flex-row justify-between">
                            <p onClick={() => setCategory('all')} className="mx-2">All Projects</p>
                            <p onClick={() => setCategory('Residential')} className="mx-2">Residential</p>
                            <p onClick={() => setCategory('Commercial')} className="mx-2">Commercial</p>
                            <p onClick={() => setCategory('Hospitality')} className="mx-2">Hospitality</p>
                            <p onClick={() => setCategory('Landscape')} className="mx-2">Landscape</p>
                            <p onClick={() => setCategory('Interior')} className="mx-2">Interior Design</p>
                        </div>
                        <hr className="border-t-2 border-slate-500" />
                    </div>
                    <div className="p-5 md:mx-24 flex flex-wrap">
                        {allProjects.map((project: featuredProjects) => (
                            <article
                                key={project?._id}
                                className="relative drop-shadow-md shadow-slate-200 isolate flex flex-col w-96 justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-5"
                            >
                                <Link to={`/project/${project._id}`}>
                                <img
                                    src={project?.images[0]} // Use the project's image property
                                    alt={project.projectName} // Use the project's title property as alt text
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
                                <h3 className="z-10 relative mt-3 text-xl font-bold text-white">
                                    {project.projectName}{" "}
                                    {/* Display the project title */}
                                </h3>
                                <div className="z-10 relative gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                    {project.category}
                                    {/* Display the project description */}
                                </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;
