import React from "react";
import { FileUploader } from "react-drag-drop-files";

interface Props {
    files: (Blob | MediaSource)[]; // Assuming the files are strings, adjust the type accordingly
    setFiles: (files: (Blob | MediaSource)[]) => void;
}

const fileTypes: string[] = ["JPG", "PNG", "GIF", "PDF"];

const DragDrop: React.FC<Props> = ({ files, setFiles }) => {
    const handleChange = (newFiles: any) => {
        const uniqueFiles = Array.from(new Set([...files, ...newFiles]));
        setFiles(uniqueFiles);
    };

    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={true}
        />
    );
};

export default DragDrop;
