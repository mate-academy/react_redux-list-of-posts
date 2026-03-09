import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchUsers } from './features/usersApi';
import {
  setPosts,
  setLoaded,
  setHasError,
  clearPosts,
} from './features/postsApi';
import { setAuthor } from './features/authorApi';
import { setSelectedPost } from './features/selectedApi';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: users } = useSelector((state: RootState) => state.users);
  const author = useSelector((state: RootState) => state.author);
  const { items: posts, loaded: postsLoaded, hasError: postsError } =
    useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector((state: RootState) => state.selectedPost);

  // Завантаження користувачів
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Завантаження постів користувача
  useEffect(() => {
    dispatch(clearPosts());
    dispatch(setSelectedPost(null)); // закриваємо Sidebar при зміні користувача

    if (!author) return;

    dispatch(setLoaded(false));
    dispatch(setHasError(false));

    getUserPosts(author.id)
      .then(data => {
        dispatch(setPosts(data));
        dispatch(setLoaded(true));
      })
      .catch(() => {
        dispatch(setHasError(true));
        dispatch(setLoaded(true));
      });
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          {/* Ліва колонка */}
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                  users={users}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div className="notification is-danger" data-cy="PostsLoadingError">
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => {
                       dispatch(setSelectedPost(post))
                    }}
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
              { 'Sidebar--open': !!selectedPost },
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