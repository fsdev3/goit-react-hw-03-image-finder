import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export class Modal extends Component {
  componentDidMount() {
    this.showModal();
  }

  showModal = () => {
    basicLightbox
      .create(
        `
        <img src="${this.props.largeImageUrl}" width="800" height="600">
      `
      )
      .show();
  };

  closeOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return <div className="modal-overlay" onClick={this.closeOverlay}></div>;
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
