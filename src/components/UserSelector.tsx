import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initUsers } from '../features/UsersSlice';
import { setAuthor } from '../features/AuthorSlice';

export const UserSelector: React.FC = () => {
  // `value` and `onChange` are traditional names for the form field
  // `selectedUser` represents what actually stored here
  // `value` та `onChange` – традиційні назви для поля форми
  // `selectedUser` представляє те, що насправді тут зберігається

  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form
  // користувачі завантажуються з API, тому з міркувань продуктивності
  // ми завантажуємо їх один раз в `UsersContext`, коли `App` відкривається
  // і тепер ми можемо легко повторно використовувати `UserSelector` у будь-якій формі
  // const users = useContext(UserContext);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users.items);
  const selectedUser = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    // we save a link to remove the listener later
    // ми зберігаємо посилання, щоб пізніше видалити слухач
    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      // ми закриваємо випадаючий список при будь-якому кліку (всередині чи зовні)
      // Тож немає потреби перевіряти, чи ми клацнули всередині списку
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // we don't want to listening for outside clicks
    // when the Dopdown is closed
    // ми не хочемо прослуховувати зовнішні кліки // коли випадаюче меню закрите
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
                e.preventDefault();
                dispatch(setAuthor(user));
                setExpanded(false);
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
