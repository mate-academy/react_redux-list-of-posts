import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/userSlice';
import { setAuthor } from './features/authorSlice';
import { fetchPosts } from './features/postsSlice';
import {
  setSelectedPost,
  clearSelectedPost,
} from './features/selectedPostsSlice';
import { User } from './types/User';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const dispatch = useAppDispatch();

  const usersState = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSelectAuthor = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(clearSelectedPost()); // reset selected post when author changes
  };

  const handleSelectPost = (postId: number) => {
    dispatch(setSelectedPost(postId));
  };

  const handleClosePostDetails = () => {
    dispatch(clearSelectedPost());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Posts App</h1>

      {/* User Selector */}
      <section>
        <h2>Users</h2>
        {usersState.error && <p style={{ color: 'red' }}>{usersState.error}</p>}
        {usersState.loading && <p>Loading users...</p>}
        {!usersState.loading && usersState.items.length > 0 && (
          <UserSelector
            users={usersState.items}
            selectedUser={author}
            onSelectUser={handleSelectAuthor}
          />
        )}
      </section>

      {/* Posts List */}
      <section style={{ marginTop: '20px' }}>
        <h2>Posts</h2>
        <PostsList authorId={author?.id} onSelectPost={handleSelectPost} />
      </section>

      {/* Post Details */}
      {selectedPost !== null && (
        <PostDetails postId={selectedPost} onClose={handleClosePostDetails} />
      )}
    </div>
  );
};
