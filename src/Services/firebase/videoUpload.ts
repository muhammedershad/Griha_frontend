import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import toast, { Toast } from "react-hot-toast";

interface CustomToast extends Toast {
    update: (
        message: string,
        opts?:
            | Partial<
                  Pick<
                      Toast,
                      | "id"
                      | "icon"
                      | "duration"
                      | "ariaProps"
                      | "className"
                      | "style"
                      | "position"
                      | "iconTheme"
                  >
              >
            | undefined
    ) => string;
}

const uploadVideosToFirebase = async (videos: any[], folderRute: string) => {
    const metadata = {
        contentType: "image/jpeg",
    };

    return toast.promise(
        Promise.all(
            videos.map((video) => {
                const storageRef = ref(storage, folderRute + video.name);
                const uploadTask = uploadBytesResumable(
                    storageRef,
                    video,
                    metadata
                );

                return new Promise<string | void>((resolve, reject) => {
                    const intervalId = setInterval(() => {
                        const progress =
                            (uploadTask.snapshot.bytesTransferred /
                                uploadTask.snapshot.totalBytes) *
                            100;
                        console.log(
                            `Upload of ${video.name} is ${progress}% done`
                        );

                        // Update the dynamic toast with the current progress
                        const customToast = toast as unknown as CustomToast;
                        customToast.update(
                            `Uploading ${video.name} (${Math.round(progress)}%)`
                        );

                        // Check if upload is complete
                        if (progress === 100) {
                            clearInterval(intervalId);
                            resolve();
                        }
                    }, 500); // Adjust the interval duration as needed

                    uploadTask.on(
                        "state_changed",
                        () => {},
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
            loading: "Uploading videos...",
            success: "All videos uploaded successfully",
            error: "Error uploading videos",
        }
    );
};

export default uploadVideosToFirebase;
