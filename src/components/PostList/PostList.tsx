import React from 'react';
import './PostList.css';
import { useSelector } from 'react-redux';
import { Post } from '../Post/Post';
import { PreparedPosts } from '../../helpers/types';
import { getFilteredPosts } from '../../store/index';

export const PostList: React.FC = () => {
  const filteredPosts = useSelector(getFilteredPosts);

  return (
    <div className="posts">
      {filteredPosts.map((post: PreparedPosts) => (
        <React.Fragment key={post.id}>
          <div>
            <Post post={post} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
