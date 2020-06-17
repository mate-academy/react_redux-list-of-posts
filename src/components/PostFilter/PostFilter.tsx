import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './PostFilter.css';
import { setFilterQuery } from '../../store/filterQuery';
import { getFilterQuery } from '../../store';
import { debounce } from '../../helpers/debounce';

export const filterPosts = (filterQuery: string, posts: PreparedPost[]) => (
  posts.filter(({ title, body }) => (title + body)
    .toLowerCase().includes(filterQuery.toLowerCase()))
);

export const PostFilter = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(getFilterQuery);

  const updateFilterQuery = useCallback(
    debounce(
      (query: string) => {
        dispatch(setFilterQuery(query));
      }, 1000,
    ), [filterQuery],
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterQuery(event.target.value);
  };

  const resetFilter = () => {
    dispatch(setFilterQuery(''));
  };

  return (
    <div className="post-list__filter">
      <input
        type="textarea"
        className="post-list__filter-input"
        onChange={handleFilterChange}
      />
      <button
        type="button"
        onClick={resetFilter}
      >
        Reset
      </button>
    </div>
  );
};
