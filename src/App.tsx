import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as actionsUsers from './features/users';
import * as actionsPosts from './features/posts';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { author } = useAppSelector(state => state.users);
  const { posts, loader, hasError, selectedPost } = useAppSelector(
    state => state.posts,
  );

  useEffect(() => {
    dispatch(actionsUsers.init());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actionsPosts.deletePost());

    if (author) {
      dispatch(actionsPosts.init(author.id));
    } else {
      dispatch(actionsPosts.set([]));
    }
  }, [author, dispatch]);

  const loaderPostList = !!author && !loader;
  const errorPostList = !!author && loader && hasError;
  const noPostYetList = !!author && loader && !hasError && posts.length === 0;
  const usePostList = !!author && loader && !hasError && posts.length > 0;

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

                {loaderPostList && <Loader />}

                {errorPostList && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostYetList && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {usePostList && <PostsList />}
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
