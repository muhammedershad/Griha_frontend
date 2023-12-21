import { Link} from "react-router-dom";

const Login = () => {

  return (
    <div>
      <section className=" z-10 ">
        <div className="flex flex-col z-10 items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full z-10 rounded-lg shadow bg-transparent backdrop-blur-[300px] border-2 border-white border-opacity-10 md:mt-0 sm:max-w-md xl:p-0 ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center first-letter: text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                User Login
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  {Error() && (
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-red-500"
                    >
                      Incorrect email or password
                    </label>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-[#2d63d8] to-[#02155c] hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't you have a account?{" "}
                  <Link to="/signup">
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign Up here
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login