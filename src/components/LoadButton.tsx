import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadDataPosts } from '../store';

export const LoadButton = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      className="load_button"
      type="button"
      onClick={() => dispatch(loadDataPosts())}
      disabled={loading}
    >
      Load
    </button>
  );
};
