import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Box } from '../Box/Box';

export class App extends Component {
  state = {
    images: null,
    currentSearch: '',
    showModal: false,
  };

  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?key=30573332-0a11d85a4e1507990835feb20&q=cat&per_page=12&orintation=horizontal&image_type=photo'
    )
      .then(res => res.json())
      .then(({ hits }) => this.setState({ images: hits }));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log(e);
    this.setState({
      currentSearch: e.currentTarget.value,
    });
  }

  render() {
    const { showModal, images } = this.state;
    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onSubmit={this.handleSubmit} />
        {images && <ImageGallery images={images} />}
        {showModal && (
          <Modal>
            <img src="" alt="" />
          </Modal>
        )}
        <Button text="Load more" />
        <Loader />
      </Box>
    );
  }
}
