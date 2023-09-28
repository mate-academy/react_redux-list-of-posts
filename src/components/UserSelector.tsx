import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { actions as selectedPostActions } from '../features/selectedPostSlice';
import { actions as selectedUserActions } from '../features/selectedUserSlice';
import { actions as usersActions } from '../features/usersSlice';
import { User } from '../types/User';
import { wait } from '../utils/fetchClient';
import { UserOption } from './UserOption';

const setSelectUser = (
  user: User,
  setIsSelectOpen: (value: boolean) => void,
  loadPosts: (id: number) => void,
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(selectedPostActions.removePost());
    await wait(0);
    dispatch(selectedUserActions.chooseUser(user));
    await wait(0);
    setIsSelectOpen(false);
    loadPosts(user.id);
    await wait(0);
  };
};

type Props = {
  loadPosts: (id: number) => void;
  setIsLoading: (value: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  loadPosts,
  setIsLoading,
}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const selectedUser = useAppSelector(state => state.user.selectedUser);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    if (isSelectOpen) {
      setIsLoading(true);

      getUsers()
        .then(data => {
          dispatch(usersActions.setUsers(data));
        })
        .catch(() => {
          dispatch(usersActions.setErrors(
            'User can\'t be selected. Please, check internet connection',
          ));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isSelectOpen]);

  const selectUserHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    e.preventDefault();

    dispatch(setSelectUser(user, setIsSelectOpen, loadPosts));
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelectOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {!!users?.length && users.map(user => (
              <UserOption
                user={user}
                selectUserHandler={selectUserHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
