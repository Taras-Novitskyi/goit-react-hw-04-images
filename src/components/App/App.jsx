import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Box } from '../Box/Box';

export class App extends Component {
  state = {
    searchImg: '',
    largeImageURL: null,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });

  //     fetch(
  //       'https://pixabay.com/api/?key=30573332-0a11d85a4e1507990835feb20&q=cat&per_page=12&orintation=horizontal&image_type=photo'
  //     )
  //       .then(res => res.json())
  //       .then(({ hits }) => this.setState({ images: hits }))
  //       .finally(this.setState({ loading: false }));
  // }

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  handleFormSubmit = searchImg => {
    this.setState({ searchImg });
  };

  showlargeImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  }

  render() {
    const { largeImageURL, searchImg } = this.state;

    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchImg={searchImg}
          showlargeImage={this.showlargeImage}
        />
        {largeImageURL && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt="#"  />
          </Modal>
        )}
        <ToastContainer />
      </Box>
    );
  }
}
