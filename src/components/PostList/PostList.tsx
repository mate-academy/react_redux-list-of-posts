import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import './PostList.css';
import { getVisiblePosts } from '../../store/index';
import SearchField from '../SearchField/SearchField';

const PostList = () => {
  const visiblePosts = useSelector(getVisiblePosts);

  return (
    <>
      <SearchField />
      <div className="post__container">
        {visiblePosts.map((post: Post) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </>
  );
};

export default PostList;
