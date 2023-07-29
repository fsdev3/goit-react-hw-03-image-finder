import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchForm, SearchHeader } from './Searchbar.styled';
//
export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onSubmitForm = evt => {
    const { inputValue } = this.state;
    const { setMainState } = this.props;
    evt.preventDefault();
    if (inputValue === '' || inputValue === this.props.searchQuery) {
      return;
    }
    setMainState(inputValue.trim().toLowerCase());
  };

  onChangeInput = evt => {
    return this.setState({ inputValue: evt.target.value });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.onSubmitForm}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="search"
            value={this.state.inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
Searchbar.propTypes = {
  setMainState: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
