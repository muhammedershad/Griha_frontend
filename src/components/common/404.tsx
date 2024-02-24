const NotFound = () => {
    return (
        <div className="h-screen w-full bg-red flex items-center justify-center">
            <div className="max-w-screen-sm w-full text-center">
                <div className="mb-20">
                    <h1 className="font-montserrat text-6xl font-bold text-purple-900">
                        404
                    </h1>
                    <h2 className="font-montserrat text-2xl font-semibold text-white uppercase mt-4">
                        Page not found
                    </h2>
                </div>
                <a
                    href="/"
                    className="font-montserrat inline-block uppercase text-purple-900 hover:text-purple-600 border-2 border-purple-900 bg-transparent px-6 py-3 text-sm font-semibold transition-all duration-200"
                >
                    Homepage
                </a>
            </div>
        </div>
    );
};

export default NotFound;
