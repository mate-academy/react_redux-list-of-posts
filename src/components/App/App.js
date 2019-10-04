import React from 'react';
import PostList from '../PostList/PostList';

import './App.css';

class App extends React.Component {
  handleEnteredName = ({ target }) => {
    this.props.inputName(target.value.toLowerCase());
    this.props.sortData();
  }

  render() {
    const {
      isLoading, sortedData, getData, usersToDisplay, originalData, resetSort, inputtedName,
    } = this.props;
    console.log(usersToDisplay);

    if (isLoading) {
      return (
        <div className="app">
          <p>Loading ...</p>
        </div>
      );
    }

    if (originalData.length === 0) {
      return (
        <div className="app">
          <button type="button" onClick={getData}> Show posts </button>
        </div>
      );
    }

    return (
      <div className="app">
        <h1>Dynamic list of posts</h1>
        <p>
          Posts:
          {sortedData.length}
        </p>
        <h2>Posted users name: </h2>
        {usersToDisplay.map(person => (
          <b>
            {person.name}
            <br />
          </b>
        ))}
        <input
          onChange={this.handleEnteredName}
          value={inputtedName}
          placeholder=" input user name"
        />
        <br />
        <button type="button" onClick={resetSort}>Reset</button>
        <PostList fullPosts={sortedData} />
      </div>
    );
  }
}

export default App;
