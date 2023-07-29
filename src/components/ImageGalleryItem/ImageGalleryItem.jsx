import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItems } from './ImageGalleryItem.styled';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export const ImageGalleryItem = ({ smallImageUrl, largeImageUrl }) => {
  const showImage = () => {
    basicLightbox
      .create(
        `
      <img src="${largeImageUrl}" width="800" height="600">
    `
      )
      .show();
  };

  return (
    <ImageGalleryItems>
      <img onClick={showImage} src={smallImageUrl} alt="" />
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  smallImageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
