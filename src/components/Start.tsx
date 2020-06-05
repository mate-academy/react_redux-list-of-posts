import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadMessage, getIsLoaded } from '../store';
import PostList from './PostList';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const loaded = useSelector(getIsLoaded);

  return (
    <>
      {loaded
        ? <PostList />
        : (
          <button
            type="button"
            onClick={() => dispatch(loadMessage())}
            disabled={loading}
            className="btn btn-outline-primary"
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        )}
    </>
  );
};
