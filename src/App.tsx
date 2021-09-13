import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './App.scss';

import { getUsers } from './api/users';

import { User } from './types';
import { isLoading, getMessage } from './store';
import { setUsersList } from './store/postsReducer';

import { Filters } from "./components/Filters";
import { PostsList } from './components/PostsList';
import { PostDetails } from "./components/PostDetails";

const App: React.FC = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedUserId = Number(searchParams.get('userId')) || 0;

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((result: User[]|any) => {
        dispatch(setUsersList(result));
      });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App__header">
        {!message && (
          <Filters />
        )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList loading={loading} selectedUserId={selectedUserId} />
        </div>
        <div className="App__content">
          <PostDetails />
        </div>
      </main>

      
      {loading ?
        <div className="alert">Loading data...</div>
      :
        <div className={message ? 'alert alert--error' : 'alert'}>
          {message ? message : 'Ready'}
        </div>}
    </div>
  );
};

export default App;
