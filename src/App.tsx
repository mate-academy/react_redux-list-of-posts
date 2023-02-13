import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  setLoading,
  setHasError,
  setPosts,
  resetPosts,
} from './features/postsSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    isLoading,
    hasError,
  } = useAppSelector(state => state.posts);

  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(setLoading(true));

    getUserPosts(userId)
      .then(postsFromServer => {
        dispatch(setPosts(postsFromServer));
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => dispatch(setLoading(false)));
  }

  useEffect(() => {
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(resetPosts());
    }
  }, [author?.id]);

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

                {author && !isLoading && !hasError && !posts.length && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length > 0 && (
                  <PostsList
                    selectedPostId={selectedPost?.id}
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
