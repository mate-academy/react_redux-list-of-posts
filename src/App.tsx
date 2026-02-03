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

import { fetchUsers } from './features/users/usersSlice';
import { selectAuthor, setAuthor } from './features/author/authorSlice';
import {
  fetchPostsByUser,
  clearPosts,
  selectPosts,
  selectPostsLoaded,
  selectPostsHasError,
} from './features/posts/postsSlice';

import {
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);
  const posts = useAppSelector(selectPosts);
  const loaded = useAppSelector(selectPostsLoaded);
  const hasError = useAppSelector(selectPostsHasError);
  const selectedPost = useAppSelector(selectSelectedPost);

  // Load users once for the dropdown
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // When author changes: clear selected post and load posts (or clear)
  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPostsByUser(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [dispatch, author]);

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
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
