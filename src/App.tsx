import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/userSlice';
import { fetchPosts } from './features/postsSlice';
import { setAuthor } from './features/authorSlice';
import { User } from './types/User';

export const App = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const posts = useAppSelector(state => state.posts.items);
  const author = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSelectAuthor = (user: User) => {
    dispatch(setAuthor(user));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Posts App</h1>

      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li
              key={user.id}
              onClick={() => handleSelectAuthor(user)}
              style={{
                cursor: 'pointer',
                fontWeight: author?.id === user.id ? 'bold' : 'normal',
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Posts</h2>
        <ul>
          {posts
            .filter(post => !author || post.userId === author.id)
            .map(post => (
              <li key={post.id}>
                <strong>{post.title}</strong>: {post.body}
              </li>
            ))}
        </ul>
      </section>

      <section>
        <p>
          Selected author: <strong>{author?.name || 'None'}</strong>
        </p>
      </section>
    </div>
  );
};
