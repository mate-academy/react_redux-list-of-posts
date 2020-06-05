import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPosts, getIsLoading } from '../store/'

export const LoadButton = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getIsLoading);
  const showPosts = useSelector(loadPosts);

  return (
    <button
      type="button"
      className="btn btn-primary btn-lg mb-2"
      onClick={() => showPosts(dispatch)}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load posts'}
    </button>
  )
}
