import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { getAppData } from './helpers/api';

import './App.css';
import {
  startLoading,
  initPosts,
  getPosts,
  isLoading,
  deletePost,
  hasError,
  getQuery,
  setQuery,
  setFilterQuery, getVisiblePosts,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const loading = useSelector(isLoading);
  const query = useSelector(getQuery);
  const visiblePosts = useSelector(getVisiblePosts);

  const handleGetPosts = () => {
    dispatch(startLoading());
    getAppData()
      .then(postsFromServer => {
        dispatch(initPosts(postsFromServer));
      })
      .catch(e => {
        dispatch(hasError(e.message));
      });
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce((value: string) => dispatch(setFilterQuery(value)), 500),
    [],
  );

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(setQuery(value));
    setFilterQueryWithDebounce(value);
  };

  return (
    <div>
      <h1 className="title">Redux list of posts</h1>
      {posts.length === 0 ? (
        <button type="button" onClick={handleGetPosts} disabled={loading}>
          {loading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <input
            className="search"
            type="text"
            value={query}
            onChange={handleSetQuery}

          />
          <div className="post-container">
            {visiblePosts
              .map(({
                id,
                postUser,
                title,
                body,
                postComment,
              }) => (
                <div className="post" key={id}>
                  <h2 className="post_title">{title}</h2>
                  <p className="post_name_user">{postUser?.name}</p>
                  <p className="post_body">{body}</p>
                  <ul className="comment-container">
                    {postComment.map(({ name, email, pbody }) => (
                      <li className="comment">
                        <h4 className="comment_name">{name}</h4>
                        <a href={`mailto:${email}`} className="comment_email">{email}</a>
                        <p className="comment_body">{pbody}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="button_delete"
                    onClick={() => dispatch(deletePost(title))}
                  >
                    Delete post
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
