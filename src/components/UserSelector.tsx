import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/usersSlice';

export const UserSelector: React.FC = () => {
  // `users` завантажуються з API, тому з міркувань продуктивності
  // ми завантажуємо їх один раз у `UsersContext`, коли відкривається `App`
  // і тепер ми можемо легко використовувати `UserSelector` у будь-якій формі

  const { users, author } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    // ми зберігаємо посилання, щоб пізніше видалити слухача
    const handleDocumentClick = () => {
      //ми закриваємо спадне меню при будь-якому клацанні (всередині чи зовні)
      // Тому немає потреби перевіряти, чи ми клацнули всередині списку
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // ми не хочемо прислухатися до зовнішніх клацань
    // коли спадне меню закрито
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{author?.name || 'Choose a user'}</span>

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
              onClick={() => dispatch(usersActions.setAuthor(user))}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
