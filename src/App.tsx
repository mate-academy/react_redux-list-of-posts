import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { loadUsers } from './features/users/users';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <PostsApp />
      </div>
    </main>
  );
};
