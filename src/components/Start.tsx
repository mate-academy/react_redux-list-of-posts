import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, finishLoading } from '../store/loading';
import { setLoaded } from '../store/loaded';
import { setPosts } from '../store/posts';
import { setError, notError } from '../store/error';
import { isLoading } from '../store';
import { getPostsFromServer } from '../helpers/api';


export const Start = ({ text }: {text: string}) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const clickLoad = async () => {
    dispatch(startLoading());
    try {
      const result = await getPostsFromServer();

      dispatch(setPosts(result));
      dispatch(notError());
    } catch (err) {
      dispatch(setError());
    } finally {
      dispatch(finishLoading());
      dispatch(setLoaded());
    }
  };

  return (
    <button
      type="button"
      onClick={clickLoad}
      disabled={loading}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};
