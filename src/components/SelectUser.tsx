import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserIdAction, loadUserAction } from '../store/actions';
import { getUserIdSelector, getUserSelector } from '../store/selectors';
import { getUsers } from './api/user';

export const SelectUser: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUserSelector);
  const userId = useSelector(getUserIdSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getUsers();

      dispatch(loadUserAction(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  return (
    <select
      className="App__user-selector"
      id="user-selector"
      value={userId}
      onChange={(event) => {
        dispatch(changeUserIdAction(+event.target.value));
      }}
    >
      <option value="0">All users</option>
      {users.map((user) => (
        <option value={user.id} key={user.id}>{user.name}</option>
      ))}
    </select>
  );
};
