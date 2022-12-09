import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  showlargeImage,
  id,
}) => {
  const imgId = `id${id}`;
  return (
    <GalleryItem className={imgId}>
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
  id: PropTypes.number.isRequired,
  showlargeImage: PropTypes.func.isRequired,
};
