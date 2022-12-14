import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { fetchImages } from 'servises/imagesApi';
import { Box } from 'components/Box/Box';

export function ImageGallery({ searchImg, page, showlargeImage, onClick }) {
  const [images, setImages] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [isShowGallery, setIsShowGallery] = useState(false);

  useEffect(() => {
    setIsShowGallery(false);
  }, [searchImg]);

  useEffect(() => {
    async function fetchAPI() {
      try {
        setIsLoad(true);
        const { images, totalHits } = await fetchImages(searchImg, page);

        if (images.length === 0) {
          toast.error('Sorry, no resault for your search');

          setIsShowGallery(false);
          setTotalImages(0);
          setImages(null);
          return;
        }

        if (page !== 1) {
          setImages(state => [...state, ...images]);
          setIsShowGallery(true);

          setTimeout(() => {
            makeSmoothScroll();
          }, 300);
          return;
        }

        setImages(images);
        setTotalImages(totalHits);
        setIsShowGallery(true);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoad(false);
      }
    }

    fetchAPI();
  }, [page, searchImg]);

  const makeSmoothScroll = () => {
    const intViewportHeight = window.innerHeight;

    window.scrollBy({
      top: intViewportHeight * 0.7,
      behavior: 'smooth',
    });
  };

    const totalPages = Math.ceil(totalImages / 12);

    if (searchImg === '' ) {
      return (
        <Box display="flex" justifyContent="center" as="h1">
          Enter key word from images search!
        </Box>
      );
    }

    return (
      <>
        {isShowGallery && (
          <>
            <GalleryList>
              {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <li key={id}>
                  <ImageGalleryItem
                    showlargeImage={showlargeImage}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                  />
                </li>
              ))}
            </GalleryList>
            {totalImages > 12 && totalPages !== page && !isLoad && (
              <Button text="Load more" onClick={onClick} />
            )}
          </>
        )}
        {isLoad && <Loader />}
      </>
    );
}

 ImageGallery.propTypes = {
   searchImg: PropTypes.string.isRequired,
   page: PropTypes.number.isRequired,
   showlargeImage: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired,
 };
