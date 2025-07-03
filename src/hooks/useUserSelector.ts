import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import * as usersActions from '../features/usersSlice';
import * as authorActions from '../features/authorSlice';
import { User } from '../types/User';

export const useUserSelector = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const authorState = useAppSelector(state => state.author);
  const selectedUser = authorState.author;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(usersActions.init());
  }, [dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  const dispatchAuthor = (user: User) => {
    dispatch(authorActions.setAuthor(user));
  };

  return {
    users,
    selectedUser,
    expanded,
    setExpanded,
    dispatchAuthor,
  };
};
