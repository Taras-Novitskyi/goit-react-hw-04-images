import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showlargeImage,
  id
}) => {
  const imgId = `id${id}`
  return (
    <GalleryItem id={imgId}>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => showlargeImage(largeImageURL)}
      />
    </GalleryItem>
  );
};