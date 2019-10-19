import React from 'react';
import './LoadingPage.css';


export const LoadingPage = ({ isLoading }) => {
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
