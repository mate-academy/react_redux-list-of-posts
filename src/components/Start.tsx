import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadMessage } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      className="btn btn-info ml"
      type="button"
      onClick={() => dispatch(loadMessage())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
