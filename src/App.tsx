/* eslint-disable @typescript-eslint/indent */
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
import { authorSelected } from './features/author/authorSlice';
import { loadPosts, resetPosts } from './features/posts/postsSlice';
import { postSelected } from './features/selectedPost/selectedPostSlice';
import { resetComments } from './features/comments/commentsSlice';
import { loadUsers } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(postSelected(null));
    dispatch(resetComments());
    if (author) {
      dispatch(loadPosts(author.id));
    }
  }, [author, dispatch]);

  const selectAuthor = (user: typeof author) => dispatch(authorSelected(user));

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {users.hasError ? (
                  <div className="notification is-danger">
                    Could not load users.{' '}
                    <button
                      type="button"
                      className="button is-small"
                      onClick={() => dispatch(loadUsers())}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <UserSelector value={author} onChange={selectAuthor} />
                )}
              </div>
              <div className="block" data-cy="MainContent">
                {!author && users.loaded && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {author && !posts.loaded && <Loader />}
                {author && posts.loaded && posts.hasError && (
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
                      posts={posts.items}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={post => dispatch(postSelected(post))}
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
              { 'Sidebar--open': selectedPost },
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
