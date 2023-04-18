import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { CgCloseR } from 'react-icons/cg';

const modalRoot = document.querySelector('#modal_root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleCloseModal());
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleCloseModal());
  }

  handleCloseModal = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { onCloseModal, activeImg } = this.props;
    return createPortal(
      <div className={css.Overlay} onclick={this.handleBackdropClick}>
        <button type="button" className={css.Button} onClick={onCloseModal}>
          <CgCloseR />
        </button>
        <div className={css.Modal}>
          <img src={activeImg.largeImageURL} alt={activeImg.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
