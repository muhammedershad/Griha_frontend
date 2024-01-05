import React, { ChangeEvent, useEffect, useState } from "react";
import EmployeeSideBar from "../../components/employee/EmployeeSideBar";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../Services/firebase";
import toast from "react-hot-toast";
import { validations } from "../../Services/validations";
// import { employeeApi } from "../../Services/employeeApi";


const EmployeeProfile = () => {
    const [image, setImage] = useState<File | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [progress, setProgress] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>('')

    useEffect(() => {
        handleUpload()
    },[image])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if ( !validations.isValidImageType(e.target.files[0].name) ) {
                return toast.error('Only images are allowed')
            } else {
                setImage(e.target.files[0])                
            }
        }
    };

    const handleUpload = () => {
        console.log("handle upload");
        if ( image ) {
            console.log('here');
            
            const metadata = {
                contentType: "image/jpeg",
            };

            const storageRef = ref(storage, "employee_profile_pictures/" + image.name);
            const uploadTask = uploadBytesResumable(
                storageRef,
                image,
                metadata
            );

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            toast.error('Unauthorized access to firebase')
                            break;
                        case "storage/canceled":
                            toast.error('Profile uploading failed')
                            break;
                        case "storage/unknown":
                            toast.error('Profile uploading failed, Error in firebase')
                            break;
                    }
                    toast.error('Error in uploading profile photo')
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL: string) => {
                            console.log("File available at", downloadURL);
                            setImageUrl(downloadURL)
                            // const saved = employeeApi.updateProfilePhoto(downloadURL)
                        }
                    )
                }
            );
        }
    };

    return (
        <>
            <EmployeeSideBar>
                <div className="container mx-auto p-4 bg-slate-950 mb-3 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <label
                                htmlFor="profilePicture"
                                className="relative cursor-pointer"
                            >
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    className="hidden"
                                    onChange={handleChange}
                                />
                                <img
                                    src={`${imageUrl}` || "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"}
                                    alt="Profile Picture"
                                    className="w-20 h-20 rounded-full mr-4 cursor-pointer"
                                />
                                <div className="absolute bottom-0 right-0 text-black rounded-full p-2">
                                    <label
                                        htmlFor="profilePicture"
                                        className="cursor-pointer"
                                    >
                                        <svg
                                            className="w-[24px] h-[24px] text-gray-800 bg-slate-500 rounded-full p-1 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 18"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="0.9"
                                                d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="0.9"
                                                d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"
                                            />
                                        </svg>
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 14a6 6 0 01-6 6m6-6a6 6 0 000-12 6 6 0 000 12z" />
            </svg> */}
                                    </label>
                                </div>
                            </label>
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Luke Short
                                </h2>
                                <p className="text-gray-500">Web Designer</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-500 mr-2">
                                Employee Id: 00001
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        <div className="lg:w-1/2 px-2">
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
                        <div className="lg:w-1/2 px-2">
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
                                Job Details
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


