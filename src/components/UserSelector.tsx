import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchUsers } from '../slices/usersSlice';
import { setAuthor } from '../slices/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: users,
    loaded,
    hasError,
  } = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author.author);

  const calledRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loaded && !hasError && !calledRef.current) {
      calledRef.current = true;
      dispatch(fetchUsers());
    }
  }, [dispatch, loaded, hasError]);

  const handleUserSelect = (userId: number) => {
    const selected = users.find(u => u.id === userId) ?? null;

    dispatch(setAuthor(selected));
    setIsOpen(false);
  };

  return (
    <div className="user-selector-wrapper" data-cy="UserSelector">
      {!loaded && !hasError && (
        <div className="user-selector-loading">Loading users...</div>
      )}

      {hasError && (
        <div className="notification is-danger">Failed to load users</div>
      )}

      {loaded && (
        <div className={`dropdown ${isOpen ? 'is-active' : ''}`}>
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{author ? author.name : 'Choose a user'}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map(u => (
                <a
                  key={u.id}
                  className={`dropdown-item ${author?.id === u.id ? 'is-active' : ''}`}
                  onClick={() => handleUserSelect(u.id)}
                  role="menuitem"
                  data-cy="UserOption"
                >
                  {u.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
