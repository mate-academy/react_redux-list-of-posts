import React, {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
// import { User } from '../types/User';
import {
  selectCurrentUser,
  selectUsers, setCurrentUser,
} from '../features/users/usersSlice';
// import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import { getPostsAsync } from '../features/posts/postsSLice';
// import { selectCount } from '../features/counter/counterSlice';

type Props = {
  // value: User | null;
};

export const UserSelector: React.FC<Props> = () => {
  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  // eslint-disable-next-line no-console
  // console.log('UserSelector users = ', users);

  const selectedUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log('expanded = ', expanded);

    if (!expanded) {
      // eslint-disable-next-line no-console
      // console.log('nothing to do');

      return;
    }

    // we save a link to remove the listener later
    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      setExpanded(false);
    };

    // eslint-disable-next-line no-console
    // console.log('document.addEventListener');
    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      // eslint-disable-next-line no-console
      // console.log('return document.removeEventListener');
      document.removeEventListener('click', handleDocumentClick);
    };
  // we don't want to listening for outside clicks
  // when the Dopdown is closed
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            // eslint-disable-next-line no-console
            // console.log('setExpanded() ');
            setExpanded(current => !current);
            // setExpanded(true);
          }}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                // onChange(user);
                dispatch(setCurrentUser(user));
                dispatch(getPostsAsync(user.id));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
