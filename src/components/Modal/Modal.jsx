import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Overlay, ModalContent, CloseIconBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
  };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContent>
        {children}
        <CloseIconBtn>
          <CloseIcon onClick={onClose} />
        </CloseIconBtn>
      </ModalContent>
    </Overlay>,
    modalRoot
  );
}

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
  };
