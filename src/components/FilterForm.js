/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSearchText, getSearchProps, setSearchText, setSearchProps, searchFields,
} from './store';

const FilterForm = ({
  currentSearch, currentSProp, setFilterProps, setFiterText,
}) => {
  const [searchInput, setSearch] = useState(currentSearch);
  let searchBy = {
    searchByTitle: currentSProp.includes(searchFields.t),
    searchByBody: currentSProp.includes(searchFields.b),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchInput !== currentSearch) {
      setFiterText(searchInput);
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    searchBy = {
      ...searchBy,
      [name]: !searchBy[name],
    };

    const newProps = (
      `${searchBy.searchByTitle
        ? searchFields.t
        : ''}${searchBy.searchByBody
        ? searchFields.b
        : ''}`
    );
    setFilterProps(newProps);
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
          checked={searchBy.searchByTitle}
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
          checked={searchBy.searchByBody}
          onChange={handleChange}
        />
        by post text
      </label>
    </form>
  );
};

FilterForm.propTypes = {
  currentSearch: PropTypes.string.isRequired,
  currentSProp: PropTypes.string.isRequired,
  setFilterProps: PropTypes.func.isRequired,
  setFiterText: PropTypes.func.isRequired,
};

const getData = state => ({
  currentSearch: getSearchText(state),
  currentSProp: getSearchProps(state),
});

const getMethods = dispatch => ({
  setFiterText: value => dispatch(setSearchText(value)),
  setFilterProps: value => dispatch(setSearchProps(value)),
});

export default connect(
  getData,
  getMethods,
)(FilterForm);
