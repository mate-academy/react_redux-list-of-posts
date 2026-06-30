import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  // Читаємо користувачів та обраного автора з Redux
  const users = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(event.target.value);

    // Знаходимо об'єкт користувача за ID
    const selectedUser = users.find(user => user.id === selectedUserId) || null;

    // Зберігаємо його в Store
    dispatch(setAuthor(selectedUser));
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <span className="button is-static">Author:</span>
      </div>
      <div className="control is-expanded">
        <div className="select is-fullwidth">
          <select
            data-cy="AuthorSelection"
            value={author ? author.id : 0}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose an author
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
