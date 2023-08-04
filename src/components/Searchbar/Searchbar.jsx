import { Component } from 'react';
import propTypes from 'prop-types';
import { SearchForm, SearchHeader } from './Searchbar.styled';

export class Searchbar extends Component {
  enterSearchData = event => {
    event.preventDefault();

    const searchData = event.currentTarget.elements.searchInput.value;
    this.props.submitFunction(searchData);

    event.currentTarget.reset();
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.enterSearchData}>
          <button type="submit">
            <img
              src={require('../../images/icons8-search-50.png')}
              alt="search"
            />
          </button>

          <input
            name="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  submitFunction: propTypes.func.isRequired,
};
