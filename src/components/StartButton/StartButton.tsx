import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLoadingStatus, loadPosts } from '../../store';

export const StartButton = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingStatus);

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
