import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
//

export class Modal extends Component {
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  closeOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
    this.showLightbox();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  showLightbox = () => {
    basicLightbox
      .create(
        `
      <img src="${this.props.largeImageUrl}" width="800" height="600">
    `
      )
      .show();
  };

  render() {
    return <></>;
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
