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
import { clearComment } from './features/commentsSlice';
import { clearPosts, fetchPosts, selectedPosts } from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.users);
  const {
    items: posts,
    isLoading,
    errorMessage,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const hasError = author && isLoading && errorMessage;

  const noPosts = author && isLoading && !errorMessage && !posts.length;

  const hasPosts = author && isLoading && !errorMessage && !!posts.length;

  useEffect(() => {
    dispatch(selectedPosts(null));
    dispatch(clearComment());

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [dispatch, author, author?.id]);

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

                {author && !isLoading && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && <PostsList />}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
