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
import {
  clearPosts,
  loadPosts,
} from './features/postsSlice';
import { selectAuthor } from './features/authorSlice';
import { clearSelectedPost } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);
  const {
    posts,
    status,
    error: hasError,
  } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();
  const loaded = status === 'idle';

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(loadPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  const loadedRight = author && loaded && !hasError;

  return (
    <main className="section">

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(status === 'loading') && (
                  <Loader />
                )}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {loadedRight && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {loadedRight && !!posts.length && (
                  <PostsList
                    posts={posts}
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
