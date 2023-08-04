import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { selectAuthor } from './features/authorSlice';
import { StatusType } from './types/Status';
import * as postsActions from './features/postsSlice';
import * as usersActions from './features/usersSlice';
import * as selectedPostActions from './features/selectedPostsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, hasError, status } = useAppSelector(state => state.posts);
  const author = useAppSelector(selectAuthor);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, []);

  useEffect(() => {
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      dispatch(postsActions.loadPosts(author.id));
    } else {
      dispatch(postsActions.clearPosts());
    }
  }, [author]);

  const isNoPosts = author && !hasError
    && posts.length === 0 && status === StatusType.Idle;

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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && status === StatusType.Loading && (
                  <Loader />
                )}

                {author && status === StatusType.Failed && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPosts && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {author
                  && posts.length > 0
                  && !hasError && status === StatusType.Idle
                  && <PostsList />}
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
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
