/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Counter } from './features/counter/Counter';
import { setAuthor, selectAuthor } from './features/author/authorSlice';
import { actions as selectedPostActions } from './features/selectedPost/selectedPostSlice';
import * as userPostsActions from './features/posts/userPostsSlice';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const author: User | null = useSelector(selectAuthor);
  const { userPosts, selectedPost } = useAppSelector((state) => state);
  const { value, isLoading, error } = userPosts;

  useEffect(() => {
    dispatch(selectedPostActions.clear());

    if (author) {
      dispatch(userPostsActions.loadUserPosts(author.id) as any);
      dispatch(userPostsActions.clear());
    }
  }, [author?.id]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={(newAuthor) => dispatch(setAuthor(newAuthor))} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && !isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !error && value.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !error && value.length > 0 && (
                  <PostsList
                    posts={value}
                  />
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
