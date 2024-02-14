import { getDownloadURL, getStorage, ref } from "firebase/storage";

const downlaodFiles = (url: string, name: string) => {
    const storage = getStorage();
    const httpsReference = ref(storage, url);

    getDownloadURL(httpsReference)
        .then((downloadURL) => {
            // Fetch the file data as a blob
            return fetch(downloadURL);
        })
        .then((response) => {
            // Get the content type from the response headers
            const contentType = response.headers.get("content-type");

            // Create a Blob from the response data
            return response.blob().then((blob) => ({ blob, contentType }));
        })
        .then(({ blob, contentType }) => {
            // Create a Blob URL for the downloaded blob
            const objectURL = URL.createObjectURL(blob);

            // Create a downloadable link
            const link = document.createElement("a");
            link.href = objectURL;

            // Set the download attribute with the provided name and file extension
            const fileExtension = contentType?.split("/").pop(); // Get the file extension from content type
            link.download = `${name}.${fileExtension}`;

            // Trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(objectURL);
        })
        .catch((error) => {
            // Handle any errors
            console.error(error);
        });
};

export default downlaodFiles;
