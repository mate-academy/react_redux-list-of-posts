import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';

import classNames from 'classnames';
import { useAppSelector } from './app/hooks';
import { AppDispatch } from './app/store';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Counter } from './features/counter/Counter';
import { clearPosts, getPostsAsync } from './features/postsSlice';
import { getUsersAsync } from './features/usersSlice';
import { clearSelectedPost } from './features/selectedPostSlice';

export const App: React.FC = () => {
  const { posts, loaded, hasError } = useAppSelector(store => store.posts);
  const { author } = useAppSelector(store => store.author);
  const { post: selectedPost } = useAppSelector(store => store.selectedPost);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(getPostsAsync(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <main className="section">
      <Counter />

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

                {author && !loaded && (
                  <Loader />
                )}

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
