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

  handleShowAll = () => {
    this.setState({ searchValue: '' });
    const { filterList } = this.props;
    filterList('');
  }

  resetList = () => {
    this.setState({ searchValue: '' });
    const { resetPostList } = this.props;
    resetPostList();
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
          onClick={this.handleShowAll}
        >
          Show all
        </button>
        <button
          onClick={this.resetList}
          type="button"
        >
          Reset all
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  filterList: PropTypes.func.isRequired,
  resetPostList: PropTypes.func.isRequired,
};

export default Search;
