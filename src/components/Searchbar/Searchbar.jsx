import { Component } from 'react';
import { SearchForm, SearchHeader } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {};
  render() {
    return (
      <SearchHeader>
        <SearchForm>
          <button type="submit">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            //   autocomplete="off"
            //   autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
