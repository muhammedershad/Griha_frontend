import React, { useEffect, useState } from "react";

interface ImagePreviewListProps {
    files: (Blob | MediaSource)[]; // Adjust the type accordingly
    setFiles: React.Dispatch<React.SetStateAction<(Blob | MediaSource)[]>>; // Adjust the type accordingly
}

const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
    files = [],
    setFiles,
}) => {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        const objectUrls = files.map((file: Blob | MediaSource) =>
            URL.createObjectURL(file)
        );
        setPreviews(objectUrls);

        // Cleanup function to revoke object URLs
        return () => {
            objectUrls.forEach((url: string) => URL.revokeObjectURL(url));
        };
    }, [files]);

    const removeImage = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <div className="relative">
            {previews.map((pic, index) => (
                <div key={index} className="relative inline-block">
                    <img
                        className="w-20 h-20 mx-2 object-contain border border-gray-900"
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
