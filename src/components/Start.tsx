import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading } from '../store';
import { loadPosts } from './../store/index';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      className="btn btn-info"
      type="button"
      onClick={() => dispatch(loadPosts())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
