import { ChangeEvent, useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import User from "../../interfaces/user";
import { useAppSelector } from "../../Services/redux/hooks";
import { validations } from "../../Services/validations";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Services/firebase";
import api from "../../Services/api";
import PersonalInfomations from "../../components/employee/PersonalInfomations";
import ChangePassword from "../../components/employee/ChangePassword";

const Profile = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [user, setUser] = useState<User>();
    const userData: User | null = useAppSelector((state) => state.user.user);
    const [info, setInfo] = useState<string>("info");

    useEffect(() => {
        if(userData) setUser(userData);
    },[userData]);

    useEffect(() => {
        handleUpload();
    }, [image]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (!validations.isValidImageType(e.target.files[0].name)) {
                return toast.error("Only images are allowed");
            } else {
                setImage(e.target.files[0]);
            }
        }
    };

    const handleUpload = () => {
        // console.log("handle upload");
        if (image) {
            console.log("here");

            const metadata = {
                contentType: "image/jpeg",
            };

            const storageRef = ref(
                storage,
                "user_profile_pictures/" + image.name
            );
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
                            toast.error("Unauthorized access to firebase");
                            break;
                        case "storage/canceled":
                            toast.error("Profile uploading failed");
                            break;
                        case "storage/unknown":
                            toast.error(
                                "Profile uploading failed, Error in firebase"
                            );
                            break;
                    }
                    toast.error("Error in uploading profile photo");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL: string) => {
                            const saved = await api.userProfilePhotoUpdate(
                                user?._id!,
                                downloadURL
                            );
                            if (saved?.success) {
                                setImageUrl(downloadURL);
                                toast.success(
                                    "Profile pic updated successfully"
                                );
                            } else {
                                toast.error("Error in uploading profile pic");
                            }
                        }
                    );
                }
            );
        }
    };
    return (
        <>
            <UserSideBar>
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
                                    src={
                                        `${imageUrl}` ||
                                        user?.image ||
                                        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                                    }
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
                                    </label>
                                </div>
                            </label>
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {`${user?.firstName ?? ""} ${
                                        user?.lastName ?? ""
                                    }`}
                                </h2>
                                <p className="text-gray-500">
                                    {user?.username}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-24">
                        <div className="lg:w-1/2 px-2">
                            <h4 className="font-semibold text-slate-400 mb-2">
                                Contact Information
                            </h4>
                            <div className="flex flex-row justify-between">
                            <p className="mb-2 text-slate-400">
                                <span className="font-bold text-slate-400">
                                    Phone:
                                </span>{" "}
                                {user?.phone ?? ""}
                            </p>
                            <p className="mb-2 text-slate-400">
                                <span className="font-bold text-slate-400">
                                    Email:
                                </span>{" "}
                                {user?.email ?? ""}
                            </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 px-2">
                            {/* <h4 className="font-semibold text-slate-300 mb-2">
                                Professional Information
                            </h4> */}
                            {/* <p className="mb-2 text-slate-400">
                                <span className="font-bold text-slate-400">
                                    Date of Join:
                                </span>{" "}
                                {user?.joinedDate.split("T")[0] ?? ""}
                            </p> */}
                            {/* <p className="mb-2 text-slate-400">
                                <span className="font-bold text-slate-400">
                                    Department:{" "}
                                </span>
                                {" " + employee?.department}
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="p-3 max-w-lg mx-auto">
                {info === "info" ? (
                    <PersonalInfomations employee={user!} />
                ) : (
                    <ChangePassword employee={user} />
                )}
                <div className="flex justify-between mt-5">
                    <span
                        onClick={() => setInfo("info")}
                        className="text-stone-300 cursor-pointer"
                    >
                        Edit Informations
                    </span>
                    <span
                        onClick={() => setInfo("changePass")}
                        className="text-stone-300 cursor-pointer"
                    >
                        Change Password
                    </span>
                </div>
            </div>
            </UserSideBar>
        </>
    );
};

export default Profile;
