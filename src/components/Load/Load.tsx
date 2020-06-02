import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { isLoading, loadPosts } from '../../store';

export const Load = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      type="button"
      className={cn('button', {
        'is-loading': loading,
        'is-primary': loading,
      })}
      onClick={() => dispatch(loadPosts())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
