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
import { setHasError, setLoaded, setPosts } from './features/posts/postsSlice';
import { clearSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.selectedAuthor);
  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then(post => {
        dispatch(setPosts(post));
      })
      .catch(() => dispatch(setHasError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author]);

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

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
