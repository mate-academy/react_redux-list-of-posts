import React from 'react';
import './App.scss';
import { LoadButton } from './components/LoadButton';
import { PostsList } from './components/PostsList';
import { useSelector } from 'react-redux';
import { getError, getIsLoaded } from './store';

const App = () => {
  const loaded = useSelector(getIsLoaded);
  const error = useSelector(getError);

  return (
    <div className="container">
      <h1 className="row center-align">Dynamic list of Posts</h1>
        {(loaded && !error) ? (
          <div className="row">
            <div className="col s12">
              <PostsList />
            </div>
          </div>
        ) : (
          <div className="row center-align">
            <LoadButton />
            <p>{error}</p>
          </div>
        )}
    </div>
  );
};

export default App;
