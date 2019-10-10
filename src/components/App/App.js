import React from 'react';
import PostList from '../PostList/PostList';

import './App.css';

class App extends React.Component {
  handleEnteredName = ({ target }) => {
    const {
      valueToSort,
      sortData,
    } = this.props;
    valueToSort(target.value.toLowerCase());
    sortData();
  }

  render() {
    const {
      isLoading,
      sortedData,
      getData,
      usersNamesList,
      originalData,
      resetSort,
      userRequest,
    } = this.props;

    return (
      <div className="app">
        { isLoading && <p>Loading ...</p> }
        { (!isLoading && originalData.length === 0)
          && <button type="button" onClick={getData}> Show posts </button>
        }
        {(!isLoading && originalData.length > 0)
        && (
        <>
          <h1>Dynamic list of posts</h1>
          <p>
            Posts:
            {sortedData.length}
          </p>
          <h2>Posted users name: </h2>
          {usersNamesList.map(person => (
            <b>
              {person.name}
              <br />
            </b>
          ))}
          <input
            onChange={this.handleEnteredName}
            value={userRequest}
            placeholder=" input user name"
          />
          <br />
          <button type="button" onClick={resetSort}>Reset</button>
          <PostList posts={sortedData} />
        </>
        )
        }
      </div>
    );
  }
}

export default App;
