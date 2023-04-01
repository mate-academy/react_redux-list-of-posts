import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedPost, fetchUserPosts } from './features/postsSlice';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const {
    posts, selectedPost, loaded, hasError,
  } = useAppSelector((state) => state.posts);

  const loadUserPosts = (userId: number) => {
    dispatch(setSelectedPost(null));
    dispatch(fetchUserPosts(userId));
  };

  useEffect(() => {
    if (author) {
      loadUserPosts(author.id);
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={setAuthor}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
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
              'Sidebar Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost ? <PostDetails /> : 'Choose a post'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
