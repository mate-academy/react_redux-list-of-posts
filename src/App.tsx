import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import Loading from './components/Loading/Loading';
import PostList from './components/PostList/PostList';
import Button from './components/Button/Button';
import {
  loadPosts, getLoaded, getVisiblePosts, getLoading, getMessage, getPosts, getQuery,
} from './store/index';

import { setQuery } from './store/search';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const errorMessage = useSelector(getMessage) || '';
  const posts = useSelector(getPosts) || [];
  const isLoaded = useSelector(getLoaded);
  const query = useSelector(getQuery);
  const visiblePosts = useSelector(getVisiblePosts);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    dispatch(setQuery(value));
  };

  return (
    <>
      <div className="container-header">
        <h1>Dynamic list of posts</h1>

        {(!isLoading && posts.length === 0) && (
          <Button
            handleOnClick={() => dispatch(loadPosts())}
            text="Load"
          />
        )}

        {isLoading && (
          <Loading
            isLoaded={isLoaded}
            errorMessage={errorMessage}
          />
        )}

        {isLoaded && (
          <>
            <label
              htmlFor="inputFilter"
              className="label"
            >
              Filter field
              <input
                type="text"
                id="inputFilter"
                className="inputFilter"
                value={query}
                onChange={handleOnChange}
              />
            </label>
            <PostList posts={visiblePosts} />
          </>
        )}

        {errorMessage
          && (
            <div className="is-error">
              <p className="is-error__text">
                {errorMessage}
              </p>
              <Button
                handleOnClick={() => dispatch(loadPosts())}
                text="Try again"
              />
            </div>
          )}
      </div>
    </>
  );
};

export default App;
