import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppSelector } from '../app/hooks';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange,
}) => {
  // // 1. Dodajemy lokalny stan dla dropdowna (nie potrzebujemy go w Redux)
  const [expanded, setExpanded] = useState(false);
  // 2. Pobieramy użytkowników z Redux
  const { items: users } = useAppSelector(state => state.users);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
      onBlur={() => setExpanded(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setExpanded(current => !current)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              onClick={e => {
                e.preventDefault(); // Blokujemy przeładowanie strony
                onChange(user); // Wywołujemy callback (w App.tsx to będzie dispatch)
                setExpanded(false); // Zamykamy dropdown po wyborze
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
