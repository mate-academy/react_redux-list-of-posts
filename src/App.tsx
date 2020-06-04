import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import debounce from 'lodash.debounce';
import Loading from './components/Loading/Loading';
import PostList from './components/PostList/PostList';
import Button from './components/Button/Button';
import {
  loadPosts, getLoaded, getVisiblePosts,
  getLoading, getMessage, getPosts, getQuery,
}
  from './store/index';

import { setQuery } from './store/search';
// import { useHistory, useLocation } from 'react-router-dom';
// import {debounce} from './helpers/debounce';
const App: React.FC = () => {
  // const history = useHistory();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const errorMessage = useSelector(getMessage);
  const posts = useSelector(getPosts);
  const isLoaded = useSelector(getLoaded);
  const query = useSelector(getQuery);
  const visiblePosts = useSelector(getVisiblePosts);
  const [visibleQuery, setVisibleQuery] = useState(query);

  const setVisibleQueryWithDebounce = useCallback(
    debounce((actualQuery: string) => dispatch(setQuery(actualQuery)), 500), [],
  );

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setVisibleQuery(value);
    setVisibleQueryWithDebounce(value);
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
                value={visibleQuery}
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
