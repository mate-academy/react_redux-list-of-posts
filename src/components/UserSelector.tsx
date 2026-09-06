import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../app/Author';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: allUsers } = useAppSelector(state => state.users);
  const { value: author } = useAppSelector(state => state.author);

  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleUserSelect = (user: User) => {
    dispatch(setAuthor(user));
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      ref={selectorRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(current => !current)}
        >
          <span>{author ? author.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
              })}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
