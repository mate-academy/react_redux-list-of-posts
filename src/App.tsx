import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import * as usersActions from './features/users';
import * as postsActions from './features/posts';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { hasError, loading, posts, selectedPost, selectedUser } =
    useAppSelector(state => ({
      ...state.users,
      ...state.posts,
    }));

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser?.id) {
      dispatch(postsActions.fetchPosts(selectedUser?.id));
      dispatch(postsActions.setSelectedPost(null));
    }
  }, [dispatch, selectedUser?.id]);

  const show = {
    postsError: !loading && hasError,
    posts: !loading && !hasError && !!posts.length,
    noPosts: !loading && !hasError && !posts.length && !!selectedUser,
    noUserSelected: !loading && !hasError && !posts.length && !selectedUser,
  };

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
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {show.postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {show.posts && <PostsList />}

                {show.noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
