"use client"
import React, { useState } from "react";
import ImageUploader, { ImageData } from "./ImageUploader";

type Props = {};

const MAX_SIMULTANEOUS_UPLOADS = 3;

const UploadSection = (props: Props) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loadingImages, setLoadingImages] = useState<string[]>([]);
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);

  const uploadImage = async (file: File) => {
    try {
      // Añadir el nombre del archivo a la lista de imágenes en carga
      setLoadingImages((prev) => [...prev, file.name]);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error uploading file");
      }

      console.log(data)
      // Actualizar la lista de imágenes con la URL devuelta
      // setImages((prevImages) => [
      //   ...prevImages,
      //   { 
      //     _id:file.name, 
      //     url: data.url ,
      //     file: file,
      //     description: '',
      //   } as ImageData
      // ]);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      // Eliminar el nombre del archivo de la lista de imágenes en carga
      setLoadingImages((prev) => prev.filter((name) => name !== file.name));
    }
  };

  const handleUpload = async (images: ImageData[]) => {
    const selectedFiles: File[]=images.map(img=>img.file)
    const pendingUploads = [...uploadQueue, ...selectedFiles];
    setUploadQueue(pendingUploads);

    while (pendingUploads.length > 0 && loadingImages.length < MAX_SIMULTANEOUS_UPLOADS) {
      const file = pendingUploads.shift();
      if (file) {
        await uploadImage(file);
      }
      setUploadQueue([...pendingUploads]);
    }
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Subida de Imágenes</h1>
      

        <ImageUploader onUpload={handleUpload} />
     

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Miniaturas (máximo 3)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.slice(-3).map((image , index) => (
            <div key={image._id} className="relative">
              <img
                src={image.url}
                alt={'image procesing'+index}
                className="w-full h-48 object-cover rounded-md border-2 border-gray-300 shadow-sm"
              />
              {loadingImages.includes(image._id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-md">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
