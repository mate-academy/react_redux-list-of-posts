import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { useAppSelector } from './app/hooks';
import { User } from './types/User';
import { set, setError, setLoaded } from './features/posts';
import { setSelected } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const author = useAppSelector<User | null>(state => state.author.value);
  const { posts, loaded, error } = useAppSelector(state => state.posts);
  const selectedPost
    = useAppSelector<Post | null>(state => state.selectPost.value);

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then(items => dispatch(set(items)))
      .catch(() => dispatch(setError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    dispatch(setSelected(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(set([]));
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
