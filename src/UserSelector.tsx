import { useSelector } from 'react-redux';
import { RootState } from './store';
import { loadPosts, clearPosts } from './postsSlice';
import { clearSelectedPost } from './selectedPostSlice';
import { useAppDispatch } from './hooks';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((s: RootState) => s.users.items);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(event.target.value);

    dispatch(clearPosts());
    dispatch(clearSelectedPost());

    if (userId) {
      dispatch(loadPosts(userId));
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Choose user</option>
      {users.map(u => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
};
