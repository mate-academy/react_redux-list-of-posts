import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import { getUsers } from './helpers/users';

import { User } from './types';
import { isLoading, getMessage } from './store';
import { setUsersList } from './store/postsReducer';

import { Filters } from "./components/Filters";
import { PostsList } from './components/PostsList';
import { PostDetails } from "./components/PostDetails";

const App: React.FC = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';

  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((result: User[]|any) => dispatch(setUsersList(result.data)));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App__header">
        <Filters />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>
        <div className="App__content">
          <PostDetails />
        </div>
      </main>

      
      {loading ?
        <div className="alert">'Loading...'</div>
      :
        <div className="alert alert--fade-out">{message}</div>}
    </div>
  );
};

export default App;
