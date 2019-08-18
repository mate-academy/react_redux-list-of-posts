import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSearchText, setSearchText, setSearchProps } from './store';

const FilterForm = ({ currentSearch, setFilterProps, setFiterText }) => {
  const [searchInput, setSearch] = useState(currentSearch);
  const [searchByTitle, setByTitle] = useState('title');
  const [searchByBody, setByBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchInput !== currentSearch) {
      setFiterText(searchInput);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === 'title') {
      setByTitle(searchByTitle === '' ? 'title' : '');
    } else {
      setByBody(searchByBody === '' ? 'body' : '');
    }

    setFilterProps(searchByTitle + searchByBody);
  };

  const filterBlur = () => {
    if (searchInput !== currentSearch) {
      setFiterText(searchInput);
    }
  };

  return (
    <form
      className="search-form"
      name="searchForm"
      action=""
      onSubmit={handleSubmit}
    >
      <input
        className="search-form__input"
        name="searchInput"
        value={searchInput}
        type="search"
        onBlur={filterBlur}
        onChange={e => setSearch(e.target.value)}
      />

      <br />

      <label htmlFor="checkTitle">
        <input
          name="searchByTitle"
          type="checkbox"
          value="title"
          id="checkTitle"
          checked={searchByTitle === 'title'}
          onChange={handleChange}
        />
        by post title
      </label>

      <label htmlFor="checkBody">
        <input
          name="searchByBody"
          type="checkbox"
          value="body"
          id="checkBody"
          checked={searchByBody === 'body'}
          onChange={handleChange}
        />
        by post text
      </label>
    </form>
  );
};

FilterForm.propTypes = {
  currentSearch: PropTypes.string.isRequired,
  setFilterProps: PropTypes.func.isRequired,
  setFiterText: PropTypes.func.isRequired,
};

const getData = state => ({
  currentSearch: getSearchText(state),
});

const getMethods = dispatch => ({
  setFiterText: value => dispatch(setSearchText(value)),
  setFilterProps: value => dispatch(setSearchProps(value)),
});

export default connect(
  getData,
  getMethods,
)(FilterForm);
