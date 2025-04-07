import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { loadUsers } from '../features/users/userSlice';
import { User } from '../types/User';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    items: users,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (loaded || hasError) {
      return;
    }

    dispatch(loadUsers());
  }, [loaded, hasError, dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  if (hasError) {
    return <p className="has-text-danger">Error loading users</p>;
  }

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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {!loaded ? (
            <p className="dropdown-item">Loading...</p>
          ) : (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => {
                  onChange(user);
                }}
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
