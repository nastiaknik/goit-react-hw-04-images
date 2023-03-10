import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const StyledModal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const Backdrop = styled.div`
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
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  top: 5px;
  right: 17px;
  scale: 1;
  cursor: pointer;
  padding: 3px;
  transition: scale cubic-bezier(0.4, 0, 0.2, 1) 250;

  :hover,
  :focus {
    scale: 1.2;
  }
`;

export const CloseIcon = styled(MdClose)`
  color: white;
`;
