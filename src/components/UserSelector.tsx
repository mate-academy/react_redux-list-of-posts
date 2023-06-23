import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { init } from '../app/slices/usersSlice';
import { setAuthor } from '../app/slices/authorSlice';
import { User } from '../types/User';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const [expanded, setExpanded] = useState(false);

  const onChangeAuthor = (user: User) => dispatch(setAuthor(user));

  useEffect(() => {
    if (!expanded) {
      return;
    }

    // we save a link to remove the listener later
    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  // we don't want to listening for outside clicks
  // when the Dopdown is closed
  }, [expanded]);

  useEffect(() => {
    dispatch(init());
  }, []);

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
            setExpanded(current => !current);
          }}
        >
          <span>
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {loading && <Loader />}

          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => onChangeAuthor(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
