import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { fetchImages } from 'servises/imagesApi';
import { Box } from 'components/Box/Box';

export class ImageGallery extends Component {
  static propTypes = {
    searchImg: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    showlargeImage: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    images: null,
    status: 'idle',
    totalImages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextImages = this.props.searchImg;
    const { page } = this.props;

    if (prevProps.searchImg !== nextImages || prevProps.page !== page) {
      if (page === 1) {
        this.setState({ status: 'pending' });
      }

      try {
        const { images, totalHits } = await fetchImages(nextImages, page);

        if (images.length === 0) {
          toast.error('Sorry, no resault for your search');
          this.setState({
            images,
            status: 'resolve',
            totalImages: totalHits,
          });
          return;
        }

        if (page !== 1) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            status: 'resolve',
          }));

          setTimeout(() => {
            this.makeSmoothScroll();
          }, 300);
          return;
        }

        this.setState({
          images,
          status: 'resolve',
          totalImages: totalHits,
        });
      } catch (error) {
        console.log(error);
        toast.error('Samething happens:( please, try again');
      }
    }
  }

  makeSmoothScroll = () => {
    const intViewportHeight = window.innerHeight;

    window.scrollBy({
      top: intViewportHeight * 0.7,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, status, totalImages, page } = this.state;
    const totalPages = Math.ceil(totalImages / 12);

    if (status === 'idle') {
      return (
        <Box display="flex" justifyContent="center" as="h1">
          Enter key word from images search!
        </Box>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
      return (
        <>
          <GalleryList>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li key={id}>
                <ImageGalleryItem
                  showlargeImage={this.props.showlargeImage}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              </li>
            ))}
          </GalleryList>
          {(totalImages > 12 || totalPages === page) && (
            <Button text="Load more" onClick={this.props.onClick} />
          )}
        </>
      );
    }
  }
}
