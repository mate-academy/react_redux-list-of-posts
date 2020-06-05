import React from 'react';
import PostList from './components/PostList';
import { useSelector } from 'react-redux';
import { Preloader } from './components/Preloader';

import './App.scss';
import { LoadButton } from './components/LoadButton';
import { isLoading, isLoaded, getErrorMessage } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const loaded = useSelector(isLoaded);
  const errorMessage = useSelector(getErrorMessage);

  return (
    <div className="App">
      {!loaded && !loading
        && (errorMessage.length === 0)
        && (
        <LoadButton />
      )}

      {loading && !loaded && <Preloader />}

      {loaded && (
        <>
          <h1>Redux list of posts</h1>
          <PostList />
        </>
      )}

      {!loaded
        && (errorMessage.length > 0)
        && (
        <h1>{errorMessage}</h1>
      )}
    </div>
  );
};

export default App;
