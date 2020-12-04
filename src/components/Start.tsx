import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store';
import { isLoading, getUserId } from '../store/selectors';
import { Loader } from './Loader';

import './Start.scss';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const selectedUserId = useSelector(getUserId);

  return (
    <div className="Start">
      {!loading ?
        (
          <button
            type="button"
            className="Start__header_button"
            onClick={() => dispatch(fetchPosts(selectedUserId))}
            disabled={loading}
          >
            {!loading && 'Click here to download posts!'}
          </button>
        ) : (
          <Loader />
        )
      }
    </div>
  );
};
