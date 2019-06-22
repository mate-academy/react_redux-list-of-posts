import React from 'react';
import { PostHandler } from './PostHandler';

export function PostList(props) {

  const {
    requested,
    loadedUsers,
    loadedPosts,
    loadedComments,
    comments,
    usersMap,
    posts,
    filterChanged,
    handleClick,
    filteredPosts,
  } = props;
  if (!requested) {
    return (
      <input type="button" onClick={handleClick} value="Download posts!" />
    );
  } if (loadedUsers && loadedPosts && loadedComments) {
    posts.length = 5;
    const items = filteredPosts.map(post => (
      <PostHandler
        key={post.id}
        userId={post.userId}
        title={post.title}
        body={post.body}
        id={post.id}
        comments={comments}
        usersMap={usersMap}
      />
    ));

    return (
      <div>
        <input
          type="text"
          placeholder="search by title"
          onChange={filterChanged}
        />
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>User</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <input type="button" disabled value="Loading..." />
  );
}
