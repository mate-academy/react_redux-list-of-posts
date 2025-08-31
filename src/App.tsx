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
import { getUsers } from './api/users';
import { UsersProvider } from './components/UsersContext';
import { setUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(s => s.users.items);
  const { items: posts, loaded, hasError } = useAppSelector(s => s.posts);
  const author = useAppSelector(s => s.author);
  const selectedPost = useAppSelector(s => s.selectedPost);

  // Загрузка пользователей один раз
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();

      dispatch(setUsers(data));
    };

    fetchUsers();
  }, [dispatch]); // <--- dispatch в deps гарантирует вызов ровно один раз

  // Загрузка постов при выборе автора
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
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UsersProvider users={users}>
                  <UserSelector
                    value={author}
                    onChange={user => dispatch(setAuthor(user))}
                  />
                </UsersProvider>
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
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
