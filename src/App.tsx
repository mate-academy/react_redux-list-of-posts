import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { setUsers } from './features/users';
import {
  clearPosts,
  setPosts,
  setPostsError,
  startLoadingPosts,
} from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { clearComments } from './features/comments';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    getUsers().then(users => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    dispatch(clearComments());

    if (!author) {
      dispatch(clearPosts());

      return;
    }

    dispatch(startLoadingPosts());

    getUserPosts(author.id)
      .then(loadedPosts => {
        dispatch(setPosts(loadedPosts));
      })
      .catch(() => {
        dispatch(setPostsError());
      });
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList />
                )}
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
