import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/authorSlice';
import { setSelectedPost } from '../features/selectedPostSlice';

export const Users = (() => {
  const users = useAppSelector(
    (state) => state.users.users,
  );
  const selectedUser = useAppSelector(
    (state) => state.author.author,
  );

  const dispatch = useAppDispatch();

  return (
    <div className="dropdown-content">
      {users.map(user => (
        <a
          key={user.id}
          href={`#user-${user.id}`}
          onClick={() => {
            dispatch(setAuthor(user));
            dispatch(setSelectedPost(null));
          }}
          className={classNames('dropdown-item', {
            'is-active': user.id === selectedUser?.id,
          })}
        >
          {user.name}
        </a>
      ))}
    </div>
  );
});
