import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setAuthor } from '../redux/slices/authorSlice';
import { Loader } from './Loader';
import { selectUsers } from '../redux/selectors';

type Props = {
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({ selectedUser }) => {
  const [expanded, setExpanded] = useState(false);

  const { users, loaded } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const onSelectAuthor = (user: User) => {
    dispatch(setAuthor(user));
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
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
            setExpanded(current => !current);
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
          {!loaded && !users.length ? (
            <Loader />
          ) : (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => onSelectAuthor(user)}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
