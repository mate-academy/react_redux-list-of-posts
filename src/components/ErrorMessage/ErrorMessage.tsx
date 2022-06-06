import { FC } from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import './ErrorMessage.scss';

export const ErrorMessage: FC = () => {
  const { errorMessage } = useAppSelector(state => state.commentReducer);

  return (
    <div className="error-message">
      {errorMessage}
    </div>
  );
};
