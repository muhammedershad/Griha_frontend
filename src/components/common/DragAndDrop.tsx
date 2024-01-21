import React from "react";
import { FileUploader, FileObject } from "react-drag-drop-files";

interface Props {
  files: []
  setFiles: (files: []) => void
}

const fileTypes: string[] = ["JPG", "PNG", "GIF"];

const DragDrop: React.FC<Props> = ({files, setFiles}) => {

  const handleChange = (newFiles: FileObject[]) => {
    const uniqueFiles = Array.from(new Set([...files, ...newFiles]));
    setFiles(uniqueFiles);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple={true} />
  );
}

export default DragDrop;
