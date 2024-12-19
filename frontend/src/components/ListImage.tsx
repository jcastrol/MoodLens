"use client";
import React, { Fragment, useEffect, useState } from "react";
import ImageCard, { Image } from "./ImageCard";

const ListImage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos desde la API
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3002/journals"); // Cambia la URL si es necesario
      if (!response.ok) {
        throw new Error("Error al obtener las imágenes");
      }
      const data = await response.json();
      setImages(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar la función cuando el componente se monte
  useEffect(() => {
    fetchImages();
  }, []);
  console.log(images)
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">
        Todas las Imágenes Subidas
      </h2>

      {loading && <p>Cargando imágenes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.map((image) => (
          <Fragment key={image.id}>
            <ImageCard  image={image} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListImage;
