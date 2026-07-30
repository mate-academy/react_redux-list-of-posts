import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { setAuthor } from '../features/author/authorSlice';

type User = {
  id: number;

  name: string;
};

export const UserSelector = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users.items);

  const author = useAppSelector(state => state.author);

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelect = (user: User) => {
    dispatch(setAuthor(user));

    setOpen(false);
  };

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={`dropdown ${open ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={event => {
            event.stopPropagation();

            setOpen(current => !current);
          }}
        >
          <span>{author ? author.name : 'Choose a user'}</span>
        </button>
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#"
              key={user.id}
              className={
                user.id === author?.id
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'
              }
              onClick={event => {
                event.preventDefault();

                handleSelect(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
