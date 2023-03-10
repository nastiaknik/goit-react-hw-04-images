import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { StyledModal, Backdrop, CloseButton, CloseIcon } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children, onClose } = this.props;

    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <StyledModal>
          {children}
          <CloseButton type="button" onClick={onClose}>
            <CloseIcon size={20} />
          </CloseButton>
        </StyledModal>
      </Backdrop>,
      document.getElementById('modal-root')
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
