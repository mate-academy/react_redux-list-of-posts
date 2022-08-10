import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import { fetchUsers, getSelectUserId } from '../../store/usersSlice';

export const UserSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const users = useAppSelector(state => state.users.users);

  const selectedUserId = useAppSelector(state => state
    .users.selectedUserId);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectUserId = +event.target.value;

    dispatch(getSelectUserId(selectUserId));
  };

  return (
    <label>
      Select a user: &nbsp;
      <select
        className="App__user-selector"
        name="selectedUserId"
        value={selectedUserId}
        onChange={handleUserChange}
      >
        <option value={0}>All users</option>
        {users && (users.map((user: User) => (
          <React.Fragment
            key={user.id}
          >
            <option value={user.id}>
              {user.name}
            </option>

          </React.Fragment>
        )))}

      </select>
    </label>
  );
};
