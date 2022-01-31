import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersLoad } from '../../redux/actions';
import { RootState } from '../../redux/rootReducer';
import { User } from '../../Types/User';
import './UserSelector.scss';

type Props = {
  searchParams: any,
};

export const UserSelector: React.FC<Props> = ({ searchParams }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const users: User[] = useSelector((state: RootState) => {
    const { usersReducer } = state;

    return usersReducer.users;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersLoad());
  }, []);

  const handleSelectChange = useCallback((id: string) => {
    if (!id.length) {
      searchParams.delete('userId');
      setIsActive(!isActive);
    } else {
      searchParams.set('userId', id);
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [isActive]);

  return (
    <div
      className="selector"
      onMouseLeave={() => setIsActive(false)}
    >
      <button
        type="button"
        className="selector__button"
        onClick={() => setIsActive(!isActive)}
      >
        Choose user
        <p>&#9660;</p>
      </button>
      <div className="selector__dropdown">
        {(isActive && users) && (
          <button
            className="selector__option"
            type="button"
            onClick={() => handleSelectChange('')}
          >
            Select all users
          </button>
        )}
        {(isActive && users) && users.map(user => (
          <button
            className="selector__option"
            type="button"
            key={user.id}
            onClick={() => user.id && handleSelectChange(user.id.toString())}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};
