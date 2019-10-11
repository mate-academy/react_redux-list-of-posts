import React, { useState, useEffect } from 'react';
import Post from '../../containers/PostHandler';
import './PostsList.scss';

function PostsList(props) {
  const {
    preparedPosts, isLoading, hasError, isLoaded,
  } = props;

  const [posts, setPosts] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPosts(preparedPosts);
  }, [preparedPosts]);

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
              onChange={(e) => {
                if (e.target.value) {
                  const filteredPosts = preparedPosts
                    .filter(post => post.title.toLowerCase()
                      .includes(search.toLowerCase())
                      || post.body.toLowerCase()
                        .includes(search.toLowerCase()));
                  setPosts(filteredPosts);
                } else {
                  setPosts(preparedPosts);
                }
                setSearch(e.target.value);
              }
              }
              value={search}
            />
          </div>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    )
  );
}

export default PostsList;
