import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { fetchPosts, clearPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';
import { setAuthor } from './features/authorSlice';
import { setUsers } from './features/usersSlice';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(s => s.users.items);
  const { items: posts, loaded, hasError } = useAppSelector(s => s.posts);
  const author = useAppSelector(s => s.author);
  const selectedPost = useAppSelector(s => s.selectedPost);

  // Загружаем пользователей один раз при старте приложения
  useEffect(() => {
    if (users.length === 0) {
      getUsers().then(data => dispatch(setUsers(data)));
    }
  }, [dispatch, users.length]);

  // Загружаем посты при выборе пользователя
  useEffect(() => {
    dispatch(setSelectedPost(null));
    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          {/* Левая панель */}
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block" data-cy="UserSelector">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                  users={users}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}
                {author && !loaded && <Loader />}
                {author && loaded && hasError && (
                  <div
                    data-cy="PostsLoadingError"
                    className="notification is-danger"
                  >
                    Something went wrong!
                  </div>
                )}
                {author && loaded && !hasError && posts.length === 0 && (
                  <div data-cy="NoPostsYet" className="notification is-warning">
                    No posts yet
                  </div>
                )}
                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Правая панель */}
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
