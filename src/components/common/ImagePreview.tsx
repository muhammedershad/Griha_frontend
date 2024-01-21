import React, { useEffect, useState } from "react";

const ImagePreviewList = ({ files, setFiles }) => {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (!files) return;

        const objectUrls = files.map((file) => URL.createObjectURL(file));
        setPreviews(objectUrls);

        // Cleanup function to revoke object URLs
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);

    const removeImage = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <div className="relative">
            {previews.map((pic, index) => (
                <div key={index} className="relative inline-block">
                    <img
                        className="w-20 h-20 mx-2"
                        src={pic}
                        alt={`Preview ${index + 1}`}
                    />
                    <span
                        className="absolute top-[-15px] right-[-7px] cursor-pointer p-1"
                        onClick={() => removeImage(index)}
                    >
                        &#10006;
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ImagePreviewList;
