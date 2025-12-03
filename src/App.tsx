import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadData } from './features/users';
import { setPost } from './features/selectedPost';

export const App: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useAppDispatch();
  const { posts, loading, hasError, user } = useAppSelector(
    state => state.posts,
  );
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  useEffect(() => {
    setSidebar(false);
    dispatch(setPost(null));
  }, [user]);

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
                {!user ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : loading ? (
                  <Loader />
                ) : hasError ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong
                  </div>
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    selectedPost={selectedPost}
                    handleSidebar={setSidebar}
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
                'Sidebar--open': sidebar,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
