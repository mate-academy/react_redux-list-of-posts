/* eslint-disable */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { RootState } from './app/store';
import { fetchUsers } from './features/users';
import { setAuthor } from './features/author';
import { fetchPostsByUser } from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hasError } = useAppSelector((state: RootState) => state.users);
  const author = useAppSelector((state: RootState) => state.author.current);
  const posts = useAppSelector((state: RootState) => state.posts);
  const selectedPost = useAppSelector(
    (state: RootState) => state.selectedPost.post,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(fetchPostsByUser(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && (hasError || posts.hasError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.items.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.items.length > 0 && (
                    <PostsList
                      onPostSelected={post => dispatch(setSelectedPost(post))}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
