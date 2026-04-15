import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

// Redux інструменти
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearPosts, fetchPosts } from './app/slices/postsSlice';
import { clearSelectedPost } from './app/slices/selectedPostSlice';
import { fetchUsers } from './app/slices/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // 1. Отримуємо все необхідне зі стору
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const authorId = useAppSelector(state => state.author.id);
  const selectedPostId = useAppSelector(state => state.selectedPost.id);

  // Знаходимо об'єкт вибраного поста для передачі в PostDetails
  const selectedPost = posts.find(p => p.id === selectedPostId) || null;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // App.tsx
  useEffect(() => {
    // Коли автор змінюється — ми ПОВИННІ скинути вибір поста
    dispatch(clearSelectedPost());

    if (authorId) {
      dispatch(fetchPosts(authorId));
    } else {
      // Якщо автор став null (скинули вибір), чистимо і список постів у сторі
      dispatch(clearPosts());
    }
  }, [authorId, dispatch]);

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
                {!authorId && <p data-cy="NoSelectedUser">No user selected</p>}

                {/* 1. Loader показуємо, поки НЕ завантажено */}
                {authorId && !loaded && <Loader />}

                {/* 2. Помилка: завантаження завершено, але є error */}
                {authorId && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {/* 3. Порожній список: завантажено, помилок немає, постів 0 */}
                {authorId && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {/* 4. Список постів: завантажено успішно, є дані */}
                {authorId && loaded && !hasError && posts.length > 0 && (
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
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {/* Передаємо об'єкт поста в деталі */}
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
