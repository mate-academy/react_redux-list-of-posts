import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/userSlice';
import { fetchPosts } from './features/postsSlice';
import { setAuthor } from './features/authorSlice';
import { User } from './types/User';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';

export const App = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const posts = useAppSelector(state => state.posts.items);
  const author = useAppSelector(state => state.author);
  const postsState = useAppSelector(state => state.posts);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSelectAuthor = (user: User) => {
    dispatch(setAuthor(user));
    setSelectedPost(null);
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

        {postsState.hasError && (
          <p style={{ color: 'red' }}>Error loading posts</p>
        )}
        {!postsState.loaded && <p>Loading posts...</p>}

        {postsState.loaded && (
          <ul>
            {posts
              .filter(post => !author || post.userId === author.id)
              .map(post => (
                <li
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{ cursor: 'pointer', marginBottom: '5px' }}
                >
                  <strong>{post.title}</strong>
                </li>
              ))}
          </ul>
        )}
      </section>

      {selectedPost && <PostDetails postId={selectedPost.id} />}
    </div>
  );
};
