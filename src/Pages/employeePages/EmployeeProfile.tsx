import React from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";

const EmployeeProfile = () => {
    return (
        <>
            <EmployeeSideBar>
                <div className="flex flex-row w-full gap-4 col-md-6 col-12">
                    <div className="col-md-6 col-12 bg-slate-900 w-full rounded-lg">
                        <div className="p-3 max-w-lg mx-auto">
                            <h1 className="text-3xl font-semibold text-white text-center mt-5 my-7">
                                Profile
                            </h1>
                            <form
                                // onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="file"
                                    // ref={fileRef}
                                    hidden
                                    accept="image/*"
                                    // onChange={(e) => setImage(e.target.files[0])}
                                />
                                <img
                                    src={
                                        //   user.profilePicture ||
                                        //   imageurl ||
                                        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJ6aCBAcZ4ldYdG3do9HOShAndpdghkiL74xysu9a-JezzYY-LK3nkp62Z8RPcHsZQAY&usqp=CAU`
                                    }
                                    alt="profile"
                                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                                    // onClick={() => fileRef.current.click()}
                                />
                                {/* <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p> */}

                                <div className="flex flex-raw gap-2">
                                    <div>
                                        <input
                                            // defaultValue={user.username}
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            className="bg-slate-100 rounded-lg p-3"
                                            // onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            // defaultValue={user.username}
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            className="bg-slate-100 rounded-lg p-3"
                                            // onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <input
                                    // defaultValue={user.username}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    // defaultValue={user.username}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    // defaultValue={user.email}
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                                    {"Update"}
                                </button>
                            </form>
                            <div className="flex justify-between mt-5">
                                <span
                                    // onClick={() => handleDeleteAccount(user._id)}
                                    className="text-red-700 cursor-pointer"
                                >
                                    Delete Account
                                </span>
                                <span className="text-red-700 cursor-pointer">
                                    Logout
                                </span>
                            </div>
                            {/* <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "User is updated successfully!"}
        </p> */}
                        </div>
                    </div>
                    <div className="col-md-6 bg-amber-400 w-full">

                    <div className="p-3 max-w-lg mx-auto">
                            <h1 className="text-3xl font-semibold text-white text-center mt-5 my-7">
                                Profile
                            </h1>
                            <form
                                // onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="file"
                                    // ref={fileRef}
                                    hidden
                                    accept="image/*"
                                    // onChange={(e) => setImage(e.target.files[0])}
                                />
                                <img
                                    src={
                                        //   user.profilePicture ||
                                        //   imageurl ||
                                        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJ6aCBAcZ4ldYdG3do9HOShAndpdghkiL74xysu9a-JezzYY-LK3nkp62Z8RPcHsZQAY&usqp=CAU`
                                    }
                                    alt="profile"
                                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                                    // onClick={() => fileRef.current.click()}
                                />
                                {/* <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p> */}

                                <div className="flex flex-raw gap-2">
                                    <div>
                                        <input
                                            // defaultValue={user.username}
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            className="bg-slate-100 rounded-lg p-3"
                                            // onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            // defaultValue={user.username}
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            className="bg-slate-100 rounded-lg p-3"
                                            // onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <input
                                    // defaultValue={user.username}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    // defaultValue={user.username}
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    // defaultValue={user.email}
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="bg-slate-100 rounded-lg p-3"
                                    // onChange={handleChange}
                                />
                                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                                    {"Update"}
                                </button>
                            </form>
                            <div className="flex justify-between mt-5">
                                <span
                                    // onClick={() => handleDeleteAccount(user._id)}
                                    className="text-red-700 cursor-pointer"
                                >
                                    Delete Account
                                </span>
                                <span className="text-red-700 cursor-pointer">
                                    Logout
                                </span>
                            </div>
                            {/* <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "User is updated successfully!"}
        </p> */}
                        </div>
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
};

export default EmployeeProfile;
