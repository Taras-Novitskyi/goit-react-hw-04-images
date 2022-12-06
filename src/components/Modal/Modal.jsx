import { Component } from 'react';
// import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <Overlay>
        <ModalContent>
          {this.props.children}
        </ModalContent>
      </Overlay>
    );
  }
}