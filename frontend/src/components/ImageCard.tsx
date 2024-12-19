interface User {
  uuid: string;
  email: string;
  name: string;
}

export interface Image {
  date: string; // formato ISO 8601
  description: string;
  emoji: string;
  id: string;
  imageUrl: string;
  user: User;
  userUuid: string;
}

export interface ImageCardProps {
  image: Image ;
}

const ImageCard = ({image}: ImageCardProps) => {
  return (
    <div className="card">
      <img
        src={image.imageUrl}
        alt="Uploaded"
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-2">
        <p className="text-sm font-semibold text-secondary">
          Descripción: <span className="accent">{image.description}</span>
        </p>
        <p className="text-sm text-secondary-text">
          Fecha: {new Date(image.date).toLocaleString()}
        </p>
        <p className="text-sm text-secondary-text">Usuario: {image.user.name}</p>
        <p className="text-2xl mt-2">{image.emoji}</p>
      </div>
    </div>
  );
};

export default ImageCard;
