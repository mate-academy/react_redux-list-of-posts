import React from "react";
import { PostsList } from "./components/PostsList/PostsList";
import { useSelector, useDispatch } from "react-redux";
import { getActiveUserId } from "./store";
import { updateUsertId } from "./store/postsReducer";
import { PostDetails } from "./components/PostDetails/PostDetails";

import "./App.scss";

const options = [
  { value: 0, name: "All users" },
  { value: 1, name: "Leanne Graham" },
  { value: 2, name: "Ervin Howell" },
  { value: 3, name: "Clementine Bauch" },
  { value: 4, name: "Patricia Lebsack" },
  { value: 5, name: "Chelsey Dietrich" },
  { value: 6, name: "Mrs. Dennis Schulist" },
  { value: 7, name: "Kurtis Weissnat" },
  { value: 8, name: "Nicholas Runolfsdottir V" },
  { value: 9, name: "Glenna Reichert" },
  { value: 10, name: "Leanne Graham" },
];

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
