import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  clear as clearPosts,
  init as setPosts,
} from './features/posts/postsSlice';
import {
  clear as clearSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { author, userPosts, selectedPost } = useAppSelector(state => state);
  const { posts, loading, hasError } = userPosts;

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(clearSelectedPost());

    if (author.data?.id) {
      dispatch(setPosts(author.data?.id));
    } else {
      dispatch(clearPosts);
    }
  }, [author.data?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author.data && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author.data && loading && (
                  <Loader />
                )}

                {author.data && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author.data && !loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author.data && !loading && !hasError && posts.length > 0 && (
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
                'Sidebar--open': selectedPost.data,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.data && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
