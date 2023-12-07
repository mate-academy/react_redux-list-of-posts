import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/usersSlice';
import { fetchPosts, setPost, setPosts } from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    loaded,
    error,
    post,
  } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.users.author);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setPost(null);

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      setPosts([]);
    }
  }, [author?.id]);

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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {author && !loaded && (
                  <Loader />
                )}

                {author && loaded && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !error && posts.length > 0 && (
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
