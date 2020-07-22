import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';
import { PostsList } from './components/PostsList';
import { SearchField } from './components/SearchField';

import { isLoading, getPosts } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const posts = useSelector(getPosts);

  return (
    <div className="App">

      {
        !posts.length
          ? <Start />
          : (
            <>
              <SearchField />
              <PostsList />
            </>
          )
      }
      <h2>{loading && 'Loading...'}</h2>
    </div>
  );
};

export default App;
