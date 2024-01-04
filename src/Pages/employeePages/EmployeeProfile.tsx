import React, { useEffect } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";

const EmployeeProfile = () => {
    useEffect(() => {
        console.log("Hello world!!!");
    });

    return (
        <>
            <EmployeeSideBar>
                <div className="container mx-auto p-4 bg-slate-950 mb-3 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <img
                                src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                            <h2 className="text-2xl font-bold">Luke Short</h2>
                            <p className="text-gray-500">Web Designer</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-500 mr-2">
                                Employee Id: 00001
                            </p>
                        </div>
                    </div>
                    <p className="mb-4">
                        The purpose of lorem ipsum is to create a natural
                        looking block of text (sentence, paragraph, page, etc.)
                        that doesn't distract from the layout. A practice not
                        without controversy.
                    </p>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-1/2 px-2">
                            <h4 className="font-semibold mb-2">
                                Contact Information
                            </h4>
                            <p className="mb-2">
                                <span className="font-bold">Phone:</span>{" "}
                                202-555-0174
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Email:</span>{" "}
                                LukeShortn@gmail.com
                            </p>
                        </div>
                        <div className="w-1/2 px-2">
                            <h4 className="font-semibold mb-2">
                                Personal Information
                            </h4>
                            <p className="mb-2">
                                <span className="font-bold">
                                    Date of Birth:
                                </span>{" "}
                                19/03/1980
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Address:</span> 2734
                                West Fork Street, EASTON 02334
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 bg-slate-400">
                    <div className="lg:w-1/2 bg-slate-900 rounded-lg">
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

                                <div className="flex flex-col lg:flex-row w-auto gap-2">
                                    <input
                                        type="text"
                                        id="username1"
                                        placeholder="Username"
                                        className="bg-slate-100 rounded-lg p-3 w-full"
                                    />

                                    <input
                                        type="text"
                                        id="username2"
                                        placeholder="Username"
                                        className="bg-slate-100 rounded-lg p-3 w-full"
                                    />
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
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-amber-400">
                        <div className="p-3 max-w-lg mx-auto">
                            <h1 className="text-3xl font-semibold text-white text-center mt-5 my-7">
                                Profile
                            </h1>
                        </div>
                    </div>
                </div>
            </EmployeeSideBar>
        </>
    );
};

export default EmployeeProfile;
