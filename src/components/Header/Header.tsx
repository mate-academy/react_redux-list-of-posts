import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsFromServer } from '../../store/index';
import { setSelectedUserId, setSelectedPostId } from '../../store/postsListSlice';
import { getUsersList } from '../../api/users';

export const Header = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: PostsState) => state.postsListSlice.selectedUserId);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value !== selectedUserId) {
      dispatch(setSelectedUserId(+event.target.value));
      dispatch(getPostsFromServer(+event.target.value));
    }

    dispatch(setSelectedPostId(0));
  };

  const [users, setUsers] = useState([]);

  const getUsersFromServer = async () => {
    const usersFromServer = await getUsersList();

    setUsers(usersFromServer);
  };

  useEffect(() => {
    getUsersFromServer();
  }, [users]);

  return (
    <header className="App__header">
      <label htmlFor="select">
        Select a user: &nbsp;
        <select
          className="App__user-selector"
          id="select"
          value={selectedUserId}
          onChange={handleUserSelect}
        >
          {users.map(
            (user) => {
              const { id, name } = user;

              return (<option value={id}>{name}</option>);
            },
          )}
        </select>
      </label>
    </header>
  );
};
