import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchData } from 'services/fetch-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
//

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
          throw new Error('Error, no results.');
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

  onLoadMore = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  largeImageURL = url => {
    this.toggleModal();
    return this.setState({ largeImageURL: url });
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
    } = this.state;

    return (
      <div>
        <Searchbar
          setMainState={this.setMainState}
          searchQuery={this.state.searchQuery}
        />

        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          images={images}
          setLargeImageUrl={this.largeImageURL}
          setMainState={this.setMainState}
        />
        {showLoadMoreBtn && <Button click={this.onLoadMore} />}
        {showModal && (
          <Modal
            largeImageUrl={this.state.largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
        {showLoader && <Loader />}
      </div>
    );
  }
}
