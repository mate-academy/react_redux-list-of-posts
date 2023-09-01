import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import * as usersActions from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author.data);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(usersActions.init());
    navigate('/');
  }, []);

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
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <Link
              to={`#user-${user.id}`}
              key={user.id}
              onClick={() => dispatch(actions.setAuthor(user))}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
