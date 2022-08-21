import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { useGetUsersQuery } from '../api/generalApi';
import { Loader } from './Loader';

type Props = {
  selectedUser: User | null | undefined;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onChange,
}) => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  const [expanded, setExpanded] = useState(false);

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

  // const { userId, postId } = useParams();

  return (
    <div className={classNames('dropdown', { 'is-active': expanded })}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setExpanded(current => !current)}
        >
          {isLoading
            ? (
              <Loader />
            )
            : (
              <span>
                {selectedUser?.name || 'Choose a user'}
              </span>
            )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <Link
              key={user.id}
              to={`/user-${user.id}`}
              onClick={() => onChange(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
