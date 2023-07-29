import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';
//
export class ImageGallery extends Component {
  showLargeImg = largeImageUrl => {
    this.props.setLargeImageUrl(largeImageUrl);
  };

  render() {
    return (
      <ImageGalleryList>
        {this.props.images.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              smallImageUrl={item.webformatURL}
              largeImageUrl={item.largeImageURL}
              showImage={this.showLargeImg}
            />
          );
        })}
      </ImageGalleryList>
    );
  }
}
ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  setLargeImageUrl: PropTypes.func,
  setMainState: PropTypes.func.isRequired,
};
