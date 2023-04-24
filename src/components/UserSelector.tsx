import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { actions as authorActions } from '../features/authorSlice/Author';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users.users);
  const selectedUser = useAppSelector(state => state.author.author);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(2)
    
    console.log(3)
    const handleDocumentClick = () => {
      if (!expanded) {
        return;
      }
      console.log('click')
      setExpanded(false);
    };
    console.log(4)
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
    //   tabIndex={0}
    //   onBlur={
    //     () => {
    //       console.log(2)
    //       setExpanded(false);
    //     }
    //  }
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={(e) => {
            e.preventDefault()
            console.log(1)
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                console.log(user, 5)
                dispatch(authorActions.set(user));
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
