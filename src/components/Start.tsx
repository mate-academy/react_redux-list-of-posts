import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { isLoading, fetchPosts, getUserId } from '../store';

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
