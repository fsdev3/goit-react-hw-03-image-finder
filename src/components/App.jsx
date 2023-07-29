import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchData } from 'services/fetch-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    largeImageURL: '',
    showLoadMoreBtn: false,
    showModal: false,
    showLoader: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (page !== prevState.page || searchQuery !== prevState.searchQuery) {
      try {
        this.setState({ showLoader: true });

        const fetchResult = await fetchData(searchQuery, page);
        if (fetchResult.length === 0) {
          throw new Error(`No results for ${searchQuery}`);
        }
        this.setState({
          images: [...this.state.images, ...fetchResult],
          showLoadMoreBtn: fetchResult.length === 12,
        });
      } catch (error) {
        this.setState({ showLoadMoreBtn: false });
        Notiflix.Notify.warning(error.message);
      } finally {
        this.setState({ showLoader: false });
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModalWithImage = url => {
    this.setState({ largeImageURL: url }, this.toggleModal);
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  setMainState = value => {
    this.setState({
      page: 1,
      images: [],
      searchQuery: value,
      showLoadMoreBtn: false,
    });
  };

  render() {
    const {
      searchQuery,
      page,
      showLoader,
      showLoadMoreBtn,
      showModal,
      images,
      largeImageURL,
    } = this.state;

    return (
      <div>
        <Searchbar setMainState={this.setMainState} searchQuery={searchQuery} />

        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          images={images}
          openModalWithImage={this.openModalWithImage}
          setMainState={this.setMainState}
          setLargeImageUrl={this.largeImageURL}
        />
        {showLoadMoreBtn && <Button click={this.onLoadMore} />}
        {showModal && (
          <Modal
            largeImageUrl={largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
        {showLoader && <Loader />}
      </div>
    );
  }
}
