import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadPosts } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      type="button"
      onClick={() => dispatch(loadPosts())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
