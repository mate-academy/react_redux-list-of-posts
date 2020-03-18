/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/store';
import { setSearchValue } from '../../redux/actionCreators';

import './SearchPost.css';

interface Props {
  changeSearchValue: (search: string) => void;
  searchValue: string;
}

export const SearchPostTemplate: FC<Props> = ({ searchValue, changeSearchValue }) => {
  const filtered = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: search } = event.target;

    changeSearchValue(search);
  };

  return (
    <>
      <label
        htmlFor="search-query"
        className="label"
      >
        Search Post
      </label>
      <input
        type="text"
        id="search-query"
        className="search_input"
        placeholder="Type search word"
        value={searchValue}
        onChange={filtered}
      />
    </>
  );
};

const mapStateToProps = (state: State) => ({
  searchValue: state.searchValue,
});

const mapDispatchToProps = {
  changeSearchValue: setSearchValue,
};

export const SearchPost = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPostTemplate);
