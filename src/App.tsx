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
import { actions as postsActions } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    isLoaded,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const { author } = useAppSelector(state => state.author);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setIsLoaded(false));
    dispatch(postsActions.setHasError(false));

    async function getUserPostsData() {
      try {
        const postsFromServer = await getUserPosts(userId);

        dispatch(postsActions.set(postsFromServer));
      } catch (error) {
        dispatch(postsActions.setHasError(true));
      } finally {
        dispatch(postsActions.setIsLoaded(true));
      }
    }

    getUserPostsData();
  }

  useEffect(() => {
    dispatch(postsActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.set([]));
    }
  }, [author?.id]);

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

                {author && !isLoaded && (
                  <Loader />
                )}

                {author && isLoaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && isLoaded && !hasError && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && isLoaded && !hasError && !!posts.length && (
                  <PostsList
                    posts={posts}
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
