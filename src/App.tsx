import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList, PostDetails, UserSelector, Loader } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { usersActions } from './features/users';
import { postsActions } from './features/posts';
import { selectedPostActions } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    if (author) {
      dispatch(postsActions.loadUserPosts(author.id));
    } else {
      dispatch(postsActions.setPosts([]));
    }

    dispatch(selectedPostActions.removePost());
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, [dispatch]);

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

                {author && loading && <Loader />}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && posts.length > 0 && (
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
