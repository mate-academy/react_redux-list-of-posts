import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
  state = {
    searchValue: '',
  }

  handleSearchText = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  handleSubmitPosts = (e) => {
    e.preventDefault();
    const { filterList } = this.props;
    const { searchValue } = this.state;
    filterList(searchValue);
  }

  handleResetList = () => {
    this.setState({ searchValue: '' });
    const { filterList } = this.props;
    filterList('');
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div>
        <form className="search-form" onSubmit={this.handleSubmitPosts}>
          <input
            placeholder="type here..."
            onChange={this.handleSearchText}
            value={searchValue}
          />
          <button type="submit">Search</button>
        </form>
        <button
          type="submit"
          onClick={this.handleResetList}
        >
          Show all
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  filterList: PropTypes.func.isRequired,
};

export default Search;
