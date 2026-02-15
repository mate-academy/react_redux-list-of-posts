import React, { useEffect } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserSelector } from './components/UserSelector';
import { fetchUsers } from './features/users/UsersSlice';
import { PostsList } from './components/PostsList';
import {
  selectAuthor,
  selectPosts,
  selectPostsHasError,
  selectPostsLoaded,
  selectSelectedPost,
} from './features/selectors';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const hasError = useAppSelector(selectPostsHasError);
  const loaded = useAppSelector(selectPostsLoaded);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor dispay">
          <div className="tile is-parent Sidebar--open">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
                  <PostsList posts={posts} />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className="tile is-parent is-8-desktop Sidebar Sidebar--open"
          >
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails />
              ) : (
                <p data-cy="NoSelectedUser">Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
