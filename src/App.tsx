import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/usersSlice';
import { setAuthor } from './features/authorSlice';
import { fetchPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Отримуємо стан з Redux Store
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  // 1. Завантажуємо список користувачів при першому рендері
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 2. Завантажуємо пости автора та скидаємо обраний пост при зміні автора
  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  const handleAuthorChange = (user: User | null) => {
    dispatch(setAuthor(user));
  };

  const handlePostSelect = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handlePostSelect}
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
