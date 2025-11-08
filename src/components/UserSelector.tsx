import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../slices/usersSlice';
import { setAuthor } from '../slices/authorSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: users, loaded, hasError } = useAppSelector(s => s.users);
  const author = useAppSelector(s => s.author.value);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded && !hasError) {
      dispatch(fetchUsers());
    }
  }, [dispatch, loaded, hasError]);

  // Закрыть по клику вне
  useEffect(() => {
    if (!open) {
      return;
    }

    const onDocMouseDown = (e: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocMouseDown);

    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  const handlePick = (u: User) => {
    dispatch(setAuthor(u));
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`dropdown is-fullwidth ${open ? 'is-active' : ''}`}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger" style={{ width: '100%' }}>
        <button
          type="button"
          className="button is-fullwidth"
          aria-haspopup="true"
          aria-controls="user-dropdown-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span data-cy="UserSelectorLabel">
            {author ? author.name : 'Choose a user'}
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="user-dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(u => (
            <a
              key={u.id}
              href="#"
              className={
                'dropdown-item' + (author?.id === u.id ? ' is-active' : '')
              }
              onClick={e => {
                e.preventDefault();
                handlePick(u);
              }}
              data-cy={`UserOption-${u.id}`}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
