import React, { useState } from 'react';
import Post from '../../containers/PostHandler';
import './PostsList.scss';

function PostsList(props) {
  const {
    preparedPosts, isLoading, hasError, isLoaded,
  } = props;

  const [search, setSearch] = useState('');

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const filteredPosts = preparedPosts
    .filter(post => post.title.indexOf(search) !== -1
      || post.body.indexOf(search) !== -1);

  return (
    (isLoading && (
      <div>
        <p>Loading...</p>
        <button
          type="button"
          onClick={props.loadPostsAndUsers}
        >
            Load
        </button>
      </div>
    ))
    || (hasError && (
      <p>Error occurred!!!</p>
    ))
    || (!isLoaded && (
      <>
        <p>No users yet</p>
        <button
          type="button"
          onClick={props.loadPostsAndUsers}
        >
                    Load
        </button>
      </>
    ))
    || (
      <div className="post-list container">
        <div className="row">
          <div className="col-12 text-center">
            <input
              id="myInput"
              className="text-center"
              type="search"
              placeholder="search please"
              value={search}
              onChange={updateSearch}
            />
          </div>
          {filteredPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    )
  );
}

export default PostsList;
