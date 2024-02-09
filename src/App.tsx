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
import { postActions } from './features/slices/postSlice';
import { resetComments } from './features/slices/commentSlice';
import { fetchPosts } from './features/thunks/postThunk';
import { fetchUser } from './features/thunks/userThunk';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.users);
  const {
    posts,
    isLoading,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postActions.setSelectedPost(null));

    if (author) {
      dispatch(resetComments());
      dispatch(fetchPosts(author.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author?.id]);

  useEffect(() => {
    dispatch(fetchUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

                {author && isLoading && (
                  <Loader />
                )}

                {author && !isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onPostSelected={
                      post => dispatch(postActions.setSelectedPost(post))
                    }
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
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
