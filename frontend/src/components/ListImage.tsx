"use client"
import React, { useState } from 'react'
import ImageCard, { Image} from './ImageCard';



const ListImage = () => {
    const [images, setImages] = useState<Image[]>([]);
  return (
    <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Todas las Imágenes Subidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <ImageCard key={image._id} image={image} />
          ))}
        </div>
      </div>
  )
}

export default ListImage