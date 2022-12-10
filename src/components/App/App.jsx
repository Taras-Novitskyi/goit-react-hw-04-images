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
    currentPage: 1
  };

  handleFormSubmit = searchImg => {
    this.setState({ searchImg, currentPage: 1 });
  };

  showlargeImage = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  }

  onClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  }

  render() {
    const { largeImageURL, searchImg, currentPage } = this.state;

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
          page={currentPage}
          showlargeImage={this.showlargeImage}
          onClick={this.onClick}
        />
        {largeImageURL && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt="#" />
          </Modal>
        )}
        <ToastContainer />
      </Box>
    );
  }
}
