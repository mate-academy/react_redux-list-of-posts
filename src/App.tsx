import React from 'react';

import './App.scss';
import { useSelector } from 'react-redux';
import { Start } from './components/Start';
import { PostLists } from './components/PostLists';
import { Filter } from './components/Filter';
import { getLoaded, isError } from './store';


const App = () => {
  // const dispatch = useDispatch();
  const loaded = useSelector(getLoaded);
  const error = useSelector(isError);

  return (
    <div className="container">
      <h1>Redux list of posts</h1>
      {error && (
        <>
          <h1>Error</h1>
          <Start text="load again" />
        </>
      )}
      {!loaded
        ? <Start text="load" />
        : (
          <div>
            <Filter />
            <PostLists />
          </div>
        )}
    </div>
  );
};

export default App;
