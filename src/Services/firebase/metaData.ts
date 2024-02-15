import { getMetadata, getStorage, ref } from "firebase/storage";

const getMetaData = async (url: string) => {
    // Make the function asynchronous
    const storage = getStorage();
    const forestRef = ref(storage, url);

    try {
        // Get metadata properties
        const metadata = await getMetadata(forestRef); // Wait for the promise to resolve
        return metadata;
    } catch (error) {
        console.log(error);
        return null; // Handle errors appropriately, and return null or some default value
    }
};

export default getMetaData;
