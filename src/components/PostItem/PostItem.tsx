import React, { FC } from 'react';
import {CommentList} from '../CommentList/CommentList';

interface PostsItemProps {
  post: PostsWithUser;
}

export const PostItem: FC<PostsItemProps> = ({ post }) => {

  return (
    <div className="post-item">
      <div className="post-item-header">
        <p>{post.user.name}</p>
        <p>{post.user.username}</p>
      </div>

      <div className="post-item-description">
        <p>{post.title}</p>
        <p>{post.body}</p>
      </div>

      <CommentList comments={post.comments} />
    </div>
  );
};
