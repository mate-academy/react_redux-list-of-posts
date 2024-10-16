import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { loadUsers } from './features/usersSlice';
import { fetchUserPosts } from './features/postsSlice';
import { RootState, AppDispatch } from './app/store';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.items);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const posts = useSelector((state: RootState) => state.posts.items);
  const postsLoaded = useSelector((state: RootState) => state.posts.loaded);
  const postsError = useSelector((state: RootState) => state.posts.hasError);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Загрузка пользователей при монтировании компонента
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  // Загружаем посты выбранного пользователя
  useEffect(() => {
    // Очищаем выбранный пост, чтобы не путать пользователя
    setSelectedPost(null);

    // Загружаем посты, если пользователь выбран
    if (selectedUser) {
      dispatch(fetchUserPosts(selectedUser.id));
    }
  }, [selectedUser, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  value={selectedUser}
                  onChange={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && !postsLoaded && <Loader />}

                {selectedUser && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  postsLoaded &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  postsLoaded &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
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
