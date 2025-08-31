import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../app/store';
import { setAuthor } from '../features/authorSlice';
import './UserSelector.scss';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.items);
  const author = useSelector((state: RootState) => state.author);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleSelect = (user: typeof author) => {
    dispatch(setAuthor(user));
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isOpen })}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger">
        <button className="button" type="button" onClick={handleToggle}>
          {author ? author.name : 'Choose a user'}
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': author?.id === user.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
