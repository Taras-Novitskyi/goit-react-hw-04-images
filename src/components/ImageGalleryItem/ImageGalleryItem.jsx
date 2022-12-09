import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showlargeImage,
}) => {
  return (
    <GalleryItem>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => showlargeImage(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showlargeImage: PropTypes.func.isRequired,
};
