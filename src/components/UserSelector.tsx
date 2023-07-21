import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUsers } from '../features/users';
import { getUsers } from '../api/users';
import { setAuthor } from '../features/author';

export const UserSelector = () => {
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(setUsers(usersFromServer)));
  }, []);

  const handleChangeAuthor = (id: number) => {
    const newAuthor = users.find(user => user.id === id);

    if (newAuthor) {
      dispatch(setAuthor(newAuthor));
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={menuRef}
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': isOpen,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleIsOpen}
        >
          <span>
            {author ? author.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(({ id, name }) => (
            <a
              key={id}
              href={`#user-${id}`}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': author?.id === id,
                },
              )}
              onClick={() => {
                handleChangeAuthor(id);
                handleToggleIsOpen();
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
