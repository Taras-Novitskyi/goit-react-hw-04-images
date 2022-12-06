import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ tags, webformatURL }) => {
  return (
    <GalleryItem>
      <Img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};