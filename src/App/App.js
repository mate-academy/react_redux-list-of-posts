import React from 'react';
import './App.css';
import { PostList } from '../components/PostList';
import { AppPropTypes } from '../constants/prototypes';

class App extends React.Component {
  state = {
    searchWord: '',
  }

  handleSearchChange = ({ target: { value } }) => {
    this.setState({ searchWord: value });
    const { searchPost } = this.props;
    searchPost(value);
  };

  render() {
    const {
      isLoaded,
      isLoading,
      hasError,
      loadPosts,
    } = this.props;
    const { searchWord } = this.state;

    return (
      <>
        <h1 className="heading">Dynamic list of todos</h1>
        {isLoaded ? (
          <>
            <input
              type="text"
              value={searchWord}
              name="search-input"
              placeholder="Search..."
              className="search"
              onChange={this.handleSearchChange}
            />
            <PostList />
          </>
        ) : (
          <>
            {hasError && (
              <h2 className="error-title">
                Oh, something went wrong! Please, try again
              </h2>
            )}
            <button
              type="button"
              className="load-button"
              onClick={loadPosts}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load posts'}
            </button>
          </>
        )}
      </>
    );
  }
}

App.propTypes = AppPropTypes;

export default App;
