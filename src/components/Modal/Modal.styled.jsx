import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  overflow: auto;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const CloseIconBtn = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  transform: scale(1)

  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover{
    transform: scale(1.1);
  }
`;