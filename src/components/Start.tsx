import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { isLoading, loadPosts } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <button
      type="button"
      className="button button__start"
      onClick={() => {
        searchParams.delete('query');
        searchParams.delete('selectedId');
        history.push({ search: searchParams.toString() });
        dispatch(loadPosts())
      }}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
