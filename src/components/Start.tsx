import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadData } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      type="button"
      className="button"
      onClick={() => dispatch(loadData())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
