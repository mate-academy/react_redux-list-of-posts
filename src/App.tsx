import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadUsers } from './usersSlice';
import { RootState } from './store';
import { UserSelector } from './UserSelector';
import { PostList } from './PostList';
import { PostDetails } from './PostDetails';
import { useAppDispatch } from './hooks';

export const App = () => {
  const dispatch = useAppDispatch();
  const usersLoaded = useSelector((s: RootState) => s.users.loaded);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  if (!usersLoaded) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="App">
      <UserSelector />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <PostList />
        <PostDetails />
      </div>
    </div>
  );
};
