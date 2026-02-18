import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initUsers } from './features/users/usersSlice';
import { initPost, setPosts } from './features/post/postSlice';
import { unselectPost } from './features/post/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const noPostsAvailable =
    author &&
    !posts.loading &&
    posts.error.length === 0 &&
    posts.posts.length === 0;

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(unselectPost());

    if (author) {
      dispatch(initPost(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor flex-container">
          <div className="tile is-parent flex-item">
            <div className="tile is-child box is-success flex-itemDown">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && posts.loading && <Loader />}

                {author && !posts.loading && posts.error.length > 0 && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsAvailable && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author &&
                  !posts.loading &&
                  posts.error.length === 0 &&
                  posts.posts.length > 0 && <PostsList />}
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
              'flex-item',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success flex-itemDown">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
