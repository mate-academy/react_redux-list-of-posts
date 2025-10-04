import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { fetchPostsByUser } from './features/postsSlice';
import { clearPosts } from './features/postsSlice';
import { clearSelectedPost } from './features/selectedPostSlice';
import { clearComments } from './features/commentsSlice';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const author = useSelector((s: RootState) => s.author.current);
  const postsState = useSelector((s: RootState) => s.posts);
  const selectedPostId = useSelector((s: RootState) => s.selectedPost?.id);

  useEffect(() => {
    if (author) {
      dispatch(fetchPostsByUser(author.id));
    } else {
      dispatch(clearPosts());
      dispatch(clearSelectedPost());
      dispatch(clearComments());
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          {/* LEFT COLUMN */}
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !postsState.loaded && !postsState.hasError && (
                  <Loader />
                )}

                {author && postsState.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  postsState.loaded &&
                  !postsState.hasError &&
                  postsState.items.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  postsState.loaded &&
                  !postsState.hasError &&
                  postsState.items.length > 0 && <PostsList />}
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
                'Sidebar--open': selectedPostId != null, // Виправлено: явна перевірка на null
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId != null && <PostDetails />}{' '}
              {/* Виправлено: явна перевірка на null */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const App: React.FC = () => <AppContent />;
