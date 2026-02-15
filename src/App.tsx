import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import {
  fetchPostsError,
  fetchPostsStart,
  fetchPostsSuccess,
} from './features/postsSlice';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { usersSlice } from './features/usersSlice';
import classNames from 'classnames';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.posts);
  const loaded = useAppSelector(state => !state.posts.loading);
  const hasError = useAppSelector(state => state.posts.error);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch(usersSlice.actions.set(usersFromServer));
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error('Failed to fetch users:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!author) {
        return;
      }

      dispatch(fetchPostsStart());
      try {
        const postsFromServer = await getUserPosts(author.id);

        dispatch(fetchPostsSuccess(postsFromServer));
      } catch (error) {
        dispatch(fetchPostsError('Something went wrong'));
      }
    };

    fetchPosts();
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
