import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { setUsersAsync } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  selectPosts,
  selectPostsHasError,
  selectPostsLoader,
  setPostsAsync,
} from './features/posts/postsSlice';
import {
  selectSelectedPost,
  setSelectedPost,
} from './features/posts/selectedPostSlice';
import { selectAuthor, setAuthor } from './features/author/authorSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const loaded = useAppSelector(selectPostsLoader);
  const hasError = useAppSelector(selectPostsHasError);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);

  useEffect(() => {
    dispatch(setUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(setPostsAsync(author.id));
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
