import classNames from 'classnames';
import { useAppSelector } from '../app/hooks';
import { User } from '../types/User';

type Props = {
  user: User;
  selectUserHandler: (
    e: React.MouseEvent<HTMLAnchorElement>,
    user: User
  ) => void;
};

export const UserOption: React.FC<Props> = ({
  user,
  selectUserHandler,
}) => {
  const selectedId = useAppSelector(state => state.user.selectedUser?.id);

  return (
    <a
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': selectedId === user.id,
      })}
      onClick={(e) => selectUserHandler(e, user)}
    >
      {user.name}
    </a>
  );
};
