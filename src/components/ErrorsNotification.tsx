import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { actions as postsActions } from '../features/postsSlice';

type Props = {
  error: string;
};

export const ErrorsNotification: React.FC<Props> = ({ error }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(postsActions.setErrors(''));
    }, 3000);
  }, []);

  return (
    <div
      className="notification is-danger"
      data-cy="PostsLoadingError"
    >
      {error}
    </div>
  );
};
