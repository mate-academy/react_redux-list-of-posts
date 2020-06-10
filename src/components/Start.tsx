import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isLoading, loadPosts, getIsLoaded } from '../store';
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
            onClick={() => dispatch(loadPosts())}
            disabled={loading}
            className="btn btn-outline-primary"
          >
            {loading ? 'Loading...' : 'Load'}
          </button>
        )}
    </>
  );
};
