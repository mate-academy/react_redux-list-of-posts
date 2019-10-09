import React from 'react';
import './LoadingPage.css';

import { store } from '../../store';

export const LoadingPage = () => {
  const { isLoading } = store.getState();
  return (
    <>
      {isLoading && (
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};
