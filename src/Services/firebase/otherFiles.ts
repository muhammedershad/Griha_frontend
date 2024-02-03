import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import toast from "react-hot-toast";

const uploadOtherFilesToFirebase = async (otherFiles, folderRute) => {
    // const metadata = {
    //     contentType: "image/jpeg",
    // };

    return toast.promise(
        Promise.all(
            otherFiles.map((file) => {
                const storageRef = ref(storage, folderRute + file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    const intervalId = setInterval(() => {
                        const progress =
                            (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                        console.log(`Upload of ${file.name} is ${progress}% done`);

                        // Update the dynamic toast with the current progress
                        toast.update("upload-progress", {
                            content: `Uploading ${file.name} (${Math.round(progress)}%)`,
                        });

                        // Check if upload is complete
                        if (progress === 100) {
                            clearInterval(intervalId);
                            resolve();
                        }
                    }, 500); // Adjust the interval duration as needed

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {},
                        (error) => {
                            clearInterval(intervalId);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    clearInterval(intervalId);
                                    resolve(downloadURL);
                                })
                                .catch((error) => {
                                    clearInterval(intervalId);
                                    reject(error);
                                });
                        }
                    );
                });
            })
        ),
        {
            loading: "Uploading other files...",
            success: "All other files uploaded successfully",
            error: "Error uploading other files",
        }
    );
};

export default uploadOtherFilesToFirebase;