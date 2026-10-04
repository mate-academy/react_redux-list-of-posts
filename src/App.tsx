import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUsers } from './features/users';
import {
  setPostsLoading,
  setPostsSuccess,
  setPostsError,
  resetPosts,
} from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { resetComments } from './features/comments';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    getUsers().then(usersData => {
      dispatch(setUsers(usersData));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!author) {
      dispatch(resetPosts());
      dispatch(setSelectedPost(null));
      dispatch(resetComments());

      return;
    }

    dispatch(setSelectedPost(null));
    dispatch(resetComments());
    dispatch(setPostsLoading());

    getUserPosts(author.id)
      .then(postsData => {
        dispatch(setPostsSuccess(postsData));
      })
      .catch(() => {
        dispatch(setPostsError());
      });
  }, [author, dispatch]);

  const isSidebarOpen = Boolean(author && selectedPost);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div
              className="tile is-child box is-success"
              data-cy="MainContent"
            >
              <div className="block">
                <UserSelector/>
              </div>

              <div className="block">
                {!author ? (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                ) : (
                  <PostsList/>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={`tile is-parent is-8-desktop Sidebar ${
              isSidebarOpen ? 'Sidebar--open' : ''
            }`}
          >
            <div className="tile is-child box is-success">
              {author && selectedPost && <PostDetails/>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
