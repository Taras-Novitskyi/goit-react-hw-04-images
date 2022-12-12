import { Component } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Overlay, ModalContent, CloseIconBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'unset';
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleCloseIconClick = () => {
      this.props.onClose();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContent>
          {this.props.children}
          <CloseIconBtn>
            <CloseIcon onClick={this.handleCloseIconClick} />
          </CloseIconBtn>
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
