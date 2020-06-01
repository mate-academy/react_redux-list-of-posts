import React from 'react';
import { useSelector } from 'react-redux';
import { isLoading } from '../store';

interface Props {
  getData: () => void;
}

export const DownloadButton: React.FC<Props> = ({ getData }) => {
  const loading = useSelector(isLoading);

  return (
    <>
      <button
        type="button"
        onClick={getData}
        disabled={loading}
        className="loading-button"
      >
        Get posts
      </button>
    </>
  );
};
