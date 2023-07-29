import PropTypes from 'prop-types';
import { ImageGalleryItems } from './ImageGalleryItem.styled';
//
export const ImageGalleryItem = ({
  smallImageUrl,
  largeImageUrl,
  showImage,
}) => {
  return (
    <ImageGalleryItems>
      <img
        onClick={() => {
          showImage(largeImageUrl);
        }}
        src={smallImageUrl}
        alt=""
      />
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  smallImageUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
