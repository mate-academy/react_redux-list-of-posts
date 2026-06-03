import React, { useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchPosts, setPosts } from './features/post';
import { setAuthor } from './features/author';
import { setSelectedPost } from './features/selectedPost';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Берем строго loaded и hasError
  const {
    items: posts,
    loaded,
    hasError: error,
  } = useAppSelector((state: RootState) => state.posts);

  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={(user: User) => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {/* Если идет загрузка — показываем Loader */}
                {author && !loaded && <Loader />}

                {/* ИСПРАВЛЕНО: Ошибка проверяется независимо от posts.length */}
                {author && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {/* Список пуст (загрузка завершена, ошибок нет) */}
                {author && loaded && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {/* Рендеринг постов (загрузка завершена, ошибок нет) */}
                {author && loaded && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => {
                      dispatch(setSelectedPost(post));
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
