import Navbar from "../../components/Home/Navbar";

const Projects = () => {
    return (
        <>
            <Navbar />
            <div className="md:mx-28 mt-28 text-white">
                <div className="w-full flex flex-row justify-between">
                    <p className="mx-2">All Projects</p>
                    <p className="mx-2">Residential</p>
                    <p className="mx-2">Commercial</p>
                    <p className="mx-2">Hospitality</p>
                </div>
                <hr className="border-t-2 border-slate-500" />
            </div>
            <div className="p-5 md:mx-24 flex flex-wrap">
                <article className="relative drop-shadow-md shadow-slate-200 isolate flex flex-col w-96 justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-5">
                    <img
                        src="https://i.pinimg.com/474x/b8/a7/69/b8a769552f677d45eff916dfc49553c5.jpg"
                        alt="University of Southern California"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                        Paris
                    </h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        City of love
                    </div>
                </article>
                <article className="relative isolate flex flex-col w-96 justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-5">
                    <img
                        src="https://i.pinimg.com/474x/b8/a7/69/b8a769552f677d45eff916dfc49553c5.jpg"
                        alt="University of Southern California"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                        Paris
                    </h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        City of love
                    </div>
                </article>
                <article className="relative isolate flex flex-col w-96 justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-5">
                    <img
                        src="https://i.pinimg.com/474x/b8/a7/69/b8a769552f677d45eff916dfc49553c5.jpg"
                        alt="University of Southern California"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                        Paris
                    </h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        City of love
                    </div>
                </article>
            </div>
        </>
    );
};

export default Projects;
