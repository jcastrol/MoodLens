"use client"
import React, { useState } from "react";
import ImageUploader, { ImageData } from "./ImageUploader";

type Props = {};

const UploadSection = (props: Props) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loadingImages, setLoadingImages] = useState<string[]>([]);

    const handleUpload = (uploadedImages: ImageData[]) => {
    const newImageIds = uploadedImages.map((image) => image._id);
    setLoadingImages((prev) => [...prev, ...newImageIds]);

    setImages((prevImages) => [...prevImages, ...uploadedImages]);

    // Simular un tiempo de carga para las imágenes
    setTimeout(() => {
      setLoadingImages((prev) => prev.filter((id) => !newImageIds.includes(id)));
    }, 2000); // 2 segundos de simulación de carga
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
