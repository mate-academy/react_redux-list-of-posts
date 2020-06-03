import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as store from '../store';

export const Start = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store.getIsLoading);
  const errorMessage = useSelector(store.getErrorMessage);

  const buttonText = (errorMessage ? 'Try again' : 'Load');

  return (
    <button
      type="button"
      className="app__load-button"
      onClick={() => dispatch(store.loadPosts())}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : buttonText}
    </button>
  );
};
