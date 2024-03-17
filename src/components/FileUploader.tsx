import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import FileUpload from "../assets/icons/fileupload.svg";
import { Button } from "./ui/button";
import { FileUploaderProps } from "@/types";

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col rounded-xl cursor-pointer bg-muted dark:bg-popover"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center items-center w-full p-5 lg:p-10">
            <div className="h-full lg:h-[420px] w-3/4">
              <img
                src={fileUrl}
                alt="image"
                className="object-cover bg-cover object-center rounded-lg h-full w-full"
              />
            </div>
          </div>
          <p className="text-gray-500 text-center w-full p-4 border-t-2">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col p-7 h-80 lg:h-[350px]">
          <img
            src={FileUpload}
            alt="upload file"
            className="dark:brightness-0 dark:invert"
          />
          <h3 className="mt-2 font-semibold">Drag photos here</h3>
          <p className="text-xs mt-1 text-gray-500">SVG, PNG, JPG</p>
          <Button className="bg-[#b9b6b6] dark:bg-muted text-black dark:text-white mt-2">
            Add from device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
