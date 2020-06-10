import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLoading } from '../store';
import { finishLoading, startLoading } from '../store/loading';
import { getPostsFromServer } from '../helpers/api';
import { setError } from '../store/error';
import { setLoaded } from '../store/loaded';
import { setPosts } from '../store/posts';


export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  async function handleLoadClick() {
    dispatch(startLoading());

    try {
      const preparedPosts = await getPostsFromServer();

      dispatch(setPosts(preparedPosts));
    } catch (error) {
      dispatch(setError());
    } finally {
      dispatch(finishLoading());
      dispatch(setLoaded());
    }
  }

  return (
    <>
      <button
        type="button"
        className="loading__btn"
        onClick={handleLoadClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load'}
      </button>
      <div>
        {loading && <span className="error">Loading error, please try again later</span>}
      </div>
    </>
  );
};
