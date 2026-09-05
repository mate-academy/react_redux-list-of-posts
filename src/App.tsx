/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  setUsers,
} from './features/users';

import {
  setAuthor,
} from './features/author';

import {
  resetPosts,
  setPosts,
  setPostsError,
  setPostsLoaded,
} from './features/posts';

import {
  setSelectedPost,
} from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    getUsers().then(users => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (!author) {
      dispatch(resetPosts());

      return;
    }

    dispatch(resetPosts());

    getUserPosts(author.id)
      .then(userPosts => {
        dispatch(setPosts(userPosts));
      })
      .catch(() => {
        dispatch(setPostsError(true));
      })
      .finally(() => {
        dispatch(setPostsLoaded(true));
      });
  }, [author, dispatch]);

  const handleAuthorChange = (user: typeof author) => {
    dispatch(setAuthor(user));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={handleAuthorChange}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.items.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.items.length > 0 && <PostsList />}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
