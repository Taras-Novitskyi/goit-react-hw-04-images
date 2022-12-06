import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';


export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
      ))}
    </GalleryList>
  );
};