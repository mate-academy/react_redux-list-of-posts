import { useDispatch, useSelector } from 'react-redux';

import { loadMessage } from '../store';
import { isLoading } from '../store/selectors';

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  return (
    <button
      type="button"
      onClick={() => dispatch(loadMessage())}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load'}
    </button>
  );
};
