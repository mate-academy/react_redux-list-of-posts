import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { Load } from './components/Load';
import { PostList } from './components/PostList';
import { Search } from './components/Search';

import { isLoaded } from './store';

const App = () => {
  const loaded = useSelector(isLoaded);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Redux list of posts</h1>
        {!loaded && <Load />}
        {loaded && (
          <>
            <Search />
            <PostList />
          </>
        )}
      </div>
    </section>
  );
};

export default App;
