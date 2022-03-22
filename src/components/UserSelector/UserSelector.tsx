import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUsers, getUserPosts } from '../../helpers/api';
import { LoadPostsAction, LoadUsersAction } from '../../store/actions';
import { getUsersSelector } from '../../store/selectors';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch();

  const users: User[] = useSelector(getUsersSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await fetchUsers();

      dispatch(LoadUsersAction(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  const loadUserPosts = async (userId: number) => {
    const userPosts = await getUserPosts(userId);

    dispatch(LoadPostsAction(userPosts));
  };

  const loadAllPosts = async () => {
    const postsFromServer = await fetchPosts();

    dispatch(LoadPostsAction(postsFromServer));
  };

  const handleUserChange = async (userId: number) => {
    if (userId === 0) {
      loadAllPosts();
    } else {
      loadUserPosts(userId);
    }
  };

  return (
    <header className="App__header">
      <label htmlFor="user-selector">
        Select a user: &nbsp;

        <select
          id="user-selector"
          className="App__user-selector"
          onChange={(event) => handleUserChange(+event.target.value)}
        >
          <option value="0">All users</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
};
