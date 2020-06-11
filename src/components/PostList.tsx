import React from 'react';
import { useSelector } from 'react-redux';
import { getVisiblePosts } from '../reducers';


const PostList: React.FC = () => {
  const posts = useSelector(getVisiblePosts);

  return (
    <ul>
      {posts.map(({ title, id }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export default PostList;
