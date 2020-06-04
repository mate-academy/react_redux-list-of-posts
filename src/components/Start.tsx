import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, loadData } from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const isLoad = useSelector(isLoading);

  return (
    <button
      type="button"
      className="buttonload"
      onClick={() => dispatch(loadData())}
      disabled={isLoad}
    >
      {isLoad ? 'Loading...' : 'Load'}
    </button>
  );
};
