import React, { useEffect } from 'react';

import './App.scss';
import { useDispatch, useSelector } from "react-redux";
import { setPostsState, getActivePostId } from './store/postsReducer';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector(getActivePostId);

  useEffect(() => {
    dispatch(setPostsState(0))
  }, [dispatch])

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <header className="App__header">
        <label>
          Select a user: &nbsp;

    <select
            className="App__user-selector"
          onChange={(event) => {
            if (+event.target.value === 0) {
              dispatch(setPostsState(0));
            } else {
              dispatch(setPostsState(+event.target.value));
            }
          }}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">

          <PostsList selectedPostId={selectedPostId} />
        </div>
        {selectedPostId ? (
    <div className="App__content">
      <PostDetails  selectedPostId={selectedPostId} />
    </div>
  ) : ''}
      </main>
    </div>
  );
};

export default App;
