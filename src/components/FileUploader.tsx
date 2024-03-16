import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUpload from "../assets/icons/fileupload.svg";

const FileUploader = () => {
  const [fileUrl, setFileUrl] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col rounded-xl cursor-pointer bg-muted dark:bg-popover"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>Test1...</div>
      ) : (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-[312px]">
          <img
            src={FileUpload}
            alt="upload file"
            className="dark:brightness-0 dark:invert"
          />
          <h3 className="mt-2 font-semibold">Drag photos here</h3>
          <p className="text-xs mt-1 text-gray-500">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
