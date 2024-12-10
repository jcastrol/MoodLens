export interface Image {
    _id: string;
    fecha: string;
    url_imagen: string;
    usuario: string;
    descripcion: string;
    emoticono: string;
  }
export interface ImageCardProps {
  image: Image ;
}

const ImageCard = ({image}: ImageCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <img
        src={image.url_imagen}
        alt="Uploaded"
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <p className="text-sm text-gray-700 font-semibold">
          Descripción: {image.descripcion}
        </p>
        <p className="text-sm text-gray-500">
          Fecha: {new Date(image.fecha).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">Usuario: {image.usuario}</p>
        <p className="text-2xl mt-2">{image.emoticono}</p>
      </div>
    </div>
  );
};

export default ImageCard;
