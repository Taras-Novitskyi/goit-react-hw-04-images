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
    showlargeImage: PropTypes.func.isRequired,
  };

  state = {
    images: null,
    status: 'idle',
    totalImages: 1,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextImages = this.props.searchImg;
    const { page } = this.state;

    if (prevProps.searchImg !== nextImages || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const { hits, totalHits } = await fetchImages(
          nextImages,
          this.state.page
        );

        if (hits.length === 0) {
          toast.error('Sorry, no resault for your search');
        }

        if (prevState.page !== page) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolve',
          }));

          setTimeout(() => {
            this.makeSmoothScroll();
          }, 300);
          return;
        }

        this.setState({
          images: hits,
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
    window.scrollBy({
      top: 828 * (this.state.page - 1),
      behavior: 'smooth',
    });
  };

  handleLoadMoreChange = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
              <ImageGalleryItem
                key={id}
                showlargeImage={this.props.showlargeImage}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </GalleryList>
          {(totalImages > 12 || totalPages === page) && (
            <Button text="Load more" onClick={this.handleLoadMoreChange} />
          )}
        </>
      );
    }
  }
}
