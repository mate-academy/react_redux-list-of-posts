/* eslint-disable no-param-reassign */
/* eslint-disable */
/* prettier-ignore */

import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { fetchPosts } from './features/posts/postsSlice';
import { Post } from './types/Post'; // Adjust the path if necessary
import { setSelectedPost } from './features/posts/selectedPostSlice';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch(); // Ensure dispatch is inside the component

  // Get Redux state
  const author = useSelector((state: RootState) => state.author) as {
    id: number;
  } | null;
  const posts = useSelector((state: RootState) => state.posts.items) as Post[];
  const loaded = useSelector(
    (state: RootState) => state.posts.loaded,
  ) as boolean;
  const hasError = useSelector(
    (state: RootState) => state.posts.hasError,
  ) as boolean;
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost,
  ) as Post | null;

  useEffect(() => {
    dispatch(setSelectedPost(null)); // Clear selected post when author changes

    if (author && 'id' in author) {
      dispatch(fetchPosts(author.id)); // Pass author.id to the updated fetchPosts
    }
  }, [author, dispatch]);

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
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
