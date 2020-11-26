import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store';
import { isLoading, getUserId } from '../store/selectors';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const selectedUserId = useSelector(getUserId);

  return (
    <button
      type="button"
      onClick={() => dispatch(fetchPosts(selectedUserId))}
      disabled={loading}
    >
      {!loading && 'Start loading Posts'}
    </button>
  );
};
