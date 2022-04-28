import React, { useEffect } from 'react';
import { changePostId } from '../../features/post/postSlice';
import { changeUserId, getUsers } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const UserSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeUserId(+(event.target.value)));
    dispatch(changePostId(0));
  };

  return (
    <label htmlFor="userSelect" className="UserSelect__label">
      Select a user: &nbsp;
      <select
        id="userSelect"
        className="App__user-selector"
        onChange={onChangeSelect}
      >
        <option value={0}>
          All users
        </option>

        {users.map((user: User) => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};
