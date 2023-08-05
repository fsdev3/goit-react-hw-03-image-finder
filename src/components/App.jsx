import { Component } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from '../services/fetchImages';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchResult: '',
    page: 1,
    totalHits: 0,
    isLoadMore: false,
    isModal: false,
    modalImageLink: '',
  };

  getSearchResults = searchResultData => {
    this.setState({
      isLoadMore: false,
      images: [],
      searchResult: searchResultData,
      page: 1,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchResult, page } = this.state;
    if (page !== prevState.page || searchResult !== prevState.searchResult) {
      this.setState({ isLoading: true });
      try {
        const imagesData = await fetchImages(searchResult, page);
        if (imagesData.length === 0) {
          throw new Error('Sorry, no results...');
        }
        const isLoadMore = page < Math.ceil(imagesData.totalHits / 12);
        this.setState(prev => ({
          images: [...prev.images, ...imagesData.hits],
          isLoadMore: isLoadMore,
          totalHits: imagesData.totalHits,
        }));
        if (!isLoadMore) {
          Notiflix.Notify.warning(
            'We are sorry, but you have reached the end of search results.'
          );
        }
      } catch (error) {
        this.setState({ isLoadMore: false, error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = largeImageLink => {
    this.setState({
      isModal: true,
      modalImageLink: largeImageLink,
    });
  };

  closeModal = () => {
    this.setState({ isModal: false });
  };

  loadMoreFunction = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    return (
      <div>
        {this.state.isModal && (
          <Modal
            eventFunction={this.closeModal}
            imageLink={this.state.modalImageLink}
          />
        )}
        <Searchbar submitFunction={this.getSearchResults} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          imageGalleryItems={this.state.images}
          itemOnClick={this.openModal}
        />
        {this.state.isLoadMore && <Button onClick={this.loadMoreFunction} />}
      </div>
    );
  }
}
