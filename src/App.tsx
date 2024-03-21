import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { actions as userActions } from './features/users';
import { PostApp } from './components/PostApp';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(userActions.loadUsers());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        {errorMessage ? (
          <div className="block notification is-danger">{errorMessage}</div>
        ) : (
          <PostApp />
        )}
      </div>
    </main>
  );
};
