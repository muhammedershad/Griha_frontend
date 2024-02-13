import React from "react";
import { FileUploader } from "react-drag-drop-files";

interface Props {
    files: string[]; // Assuming the files are strings, adjust the type accordingly
    setFiles: (files: string[]) => void;
}

const fileTypes: string[] = ["JPG", "PNG", "GIF", "PDF"];

const DragDrop: React.FC<Props> = ({ files, setFiles }) => {
    const handleChange = (newFiles: string[]) => {
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
