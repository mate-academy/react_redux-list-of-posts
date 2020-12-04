import React from "react";
import { PostsList } from "./components/PostsList/PostsList";
import { options } from "./helpers/options";
import { useSelector, useDispatch } from "react-redux";
import { getActiveUserId } from "./store";
import { updateUsertId } from "./store/posts";
import { PostDetails } from "./components/PostDetails/PostDetails";

import "./App.scss";

const App = () => {
  const activeUserId = useSelector(getActiveUserId);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={activeUserId}
            onChange={(e) => dispatch(updateUsertId(+e.target.value))}
          >
            {options.map(({ value, name }) => (
              <option value={value} key={value}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
