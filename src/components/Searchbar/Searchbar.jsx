import { Component } from 'react';
import { SearchForm, SearchHeader } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.value);
    console.log(this.props.searchText);

    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      // fetch(
      //   'https://pixabay.com/api/?q=cat&page=1&key=37263495-0dc17f57687021d8824007ffe&image_type=photo&orientation=horizontal&per_page=12'
      // );
    }
  }
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
