import React from 'react';
import PropsTypes from 'prop-types';
import { DebounceInput as Search } from 'react-debounce-input';
import {
  getPostsFromServer,
  getCommentsFromServer,
  getUsersFromServer,
} from '../api/api';

import PostsPage from '../PostsPage';

const PostList = ({
  posts,
  isLoading,
  query,
  setPosts,
  setIsLoading,
  setQuery,
}) => {
  const loadData = async() => {
    setIsLoading(true);

    const [postsData, commentsData, usersData] = await Promise.all(
      [getPostsFromServer(), getCommentsFromServer(), getUsersFromServer()]
    );

    const dataFromServer = mergeData(postsData, commentsData, usersData);

    setPosts(dataFromServer);

    setIsLoading(false);
  };

  const mergeData = (postsData, commentsData, usersData) => postsData.map(
    post => ({
      ...post,
      user: usersData.find(user => user.id === post.userId),
      comments: commentsData.filter(comment => comment.postId === post.id),
    })
  );

  const postSearch = () => posts.filter(
    ({ title, body }) => (title + body).toLowerCase().includes(query),
  );

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!isLoading && posts.length !== 0
        ? (
          <>
            <Search
              className="search"
              type="search"
              debounceTimeout={500}
              placeholder="search"
              onChange={({ target }) => {
                setQuery(target.value.trim().toLowerCase());
              }}
            />
            <PostsPage posts={postSearch()} />
          </>
        )
        : (
          <button
            type="button"
            className="post__button"
            onClick={loadData}
          >
            Load
          </button>
        )
      }
    </div>
  );
};

PostList.propTypes = {
  posts: PropsTypes.arrayOf.isRequired,
  isLoading: PropsTypes.bool.isRequired,
  query: PropsTypes.string.isRequired,
  setPosts: PropsTypes.func.isRequired,
  setIsLoading: PropsTypes.func.isRequired,
  setQuery: PropsTypes.func.isRequired,
};

export default PostList;
