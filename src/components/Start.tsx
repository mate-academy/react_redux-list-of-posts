import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsLoading, loadMessage } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getIsLoading);

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => dispatch(loadMessage())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
