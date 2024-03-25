import React, { useCallback, useEffect, useState } from 'react';
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
import { init } from './features/Posts';
import { clear } from './features/Users';
import { setSelectedPost } from './features/SelectedPost';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const loadUsersPost = useCallback(
    (userId: number) => {
      dispatch(init(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    clear();
    setSelectedPost(null);

    if (author) {
      dispatch(() => loadUsersPost(author.id));
    }
  }, [author, loadUsersPost, dispatch]);

  const IsNoPostsShown = author && !loading && !error && posts.length === 0;
  const IsPostListShown = author && !loading && !error && posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loading && <Loader />}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {IsNoPostsShown && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {IsPostListShown && <PostsList />}
              </div>
            </div>
          </div>

          {author && selectedPost.selectedPost && (
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
                <PostDetails />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
