import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPost, getPosts } from './api/posts';
import {
  ErrorsNotification,
} from './components/ErrorsNotification';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as postsActions } from './features/postsSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { error, posts } = useAppSelector(state => state.posts);
  const selectedUser = useAppSelector(state => state.user.selectedUser);
  const selectedPost = useAppSelector(state => state.post.selectedPost);
  const dispatch = useAppDispatch();

  const loadPosts = (userId: number) => {
    setIsLoading(true);

    getPosts(userId)
      .then(data => {
        dispatch(postsActions.setPosts(data));
      })
      .catch(() => {
        dispatch(postsActions.setErrors('Unable to load posts'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadPost = (postId: number) => {
    getPost(postId)
      .then(data => {
        dispatch(selectedPostActions.choosePost(data));
      })
      .catch(() => {
        dispatch(postsActions.setErrors('Post detail can\'t be loaded'));
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  loadPosts={loadPosts}
                  setIsLoading={setIsLoading}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {error && (
                  <ErrorsNotification error={error} />
                )}

                {selectedUser && !posts?.length && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!!posts?.length && (
                  <PostsList loadPost={loadPost} />
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
              'Sidebar', {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
