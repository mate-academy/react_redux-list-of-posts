import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  GET_USERS_ENDPOINT,
  useGetUsersFromServerQuery,
} from '../features/api/users';

type Props = {
  value: number | null;
  onChange: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: userId,
  onChange,
}) => {
  const { data } = useGetUsersFromServerQuery(
    GET_USERS_ENDPOINT,
    { refetchOnMountOrArgChange: true },
  );

  const users = useMemo(() => {
    return data || [];
  }, [data]);

  const [expanded, setExpanded] = useState(false);

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
            {users.find(user => user.id === userId)?.name || 'Choose a user'}
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
                onChange(user.id);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === userId,
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
