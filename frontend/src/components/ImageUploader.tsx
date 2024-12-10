import { useState, DragEvent, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ImageData {
  _id:string;  
  file: File;
  url: string;
  description: string;
}

interface ImageUploaderProps {
  onUpload: (images: ImageData[]) => void;
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [dragging, setDragging] = useState(false);

  

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 3);
    handleFiles(files);
  };
  const handleFiles = (files: File[]) => {
    const images = files.map((file) => ({
        _id: uuidv4(),  
      file,
      url: URL.createObjectURL(file),
      description: "",
    }));
    onUpload(images);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    handleFiles(files);
  };

  return (
    <div className="flex justify-center items-center">
      <label
        className={`w-full  border-4 border-dashed rounded-lg p-20 cursor-pointer transition-all duration-300 ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        } hover:border-blue-500 hover:bg-blue-50`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <svg
            className={`w-16 h-16 mb-4 ${
              dragging ? "text-blue-500" : "text-gray-400"
            } transition-colors duration-300`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16a4 4 0 118 0m-8 0a4 4 0 118 0m-8 0a4 4 0 118 0M12 8V4m0 0L8 8m4-4l4 4"
            />
          </svg>
          <p className="text-lg font-medium text-gray-700 mb-2">
            {dragging ? "Suelta las imágenes aquí" : "Arrastra y suelta tus imágenes aquí"}
          </p>
          <p className="text-sm text-gray-500">O haz clic para seleccionar imágenes</p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept="image/*"
          />
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
