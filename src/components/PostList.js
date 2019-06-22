import React from 'react';
import { Posts } from './Posts';

export function PostList(props) {
  const {
    requested,
    loadedUsers,
    loadedPosts,
    comments,
    users,
    postComponents,
    filterChanged,
    handleClick,
  } = props;
  if (!requested) {
    return (
      <input type="button" onClick={handleClick} value="Download posts!" />
    );
  } if (
    loadedUsers
                   && loadedPosts
                   && comments
  ) {
    const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
    const items = postComponents.map(item => (
      <Posts
        key={item.id}
        userId={item.userId}
        title={item.title}
        body={item.body}
        id={item.id}
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
