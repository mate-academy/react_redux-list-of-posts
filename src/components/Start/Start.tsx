import { useDispatch, useSelector } from 'react-redux';
import {
  isLoading,
  loadPosts,
  loadUsers,
} from '../../store';
import { Loader } from '../Loader';
import './Start.scss';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const handleClick = () => {
    dispatch(loadUsers());
    dispatch(loadPosts());
  };

  return (
    <>
      <button
        type="button"
        className="Start__button"
        onClick={handleClick}
      >
        Start
      </button>

      {loading && <Loader />}
    </>
  );
};
