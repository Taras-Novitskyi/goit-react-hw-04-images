import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Box } from '../Box/Box';

export function App() {
  const [searchImg, setSearchImd] = useState('');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = searchImg => {
    setSearchImd(searchImg);
    setCurrentPage(1)
  };

  // const showlargeImage = largeImageURL => {
  //   setLargeImageURL(largeImageURL)
  // };

  // const closeModal = () => {
  //   setLargeImageURL(null)
  // }

  const onClick = () => {
    setCurrentPage(state => state + 1)
  }

    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr"
        gridGap="16px"
        paddingBottom="24px"
      >
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          searchImg={searchImg}
          page={currentPage}
          showlargeImage={setLargeImageURL}
          onClick={onClick}
        />
        {largeImageURL && (
          <Modal onClose={() => setLargeImageURL(null)}>
            <img src={largeImageURL} alt="#" />
          </Modal>
        )}
        <ToastContainer />
      </Box>
    );
}
