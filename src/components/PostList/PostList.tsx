import React, { FC, Fragment } from 'react';

import './PostList.css';
import { Post } from '../Post/Post';


interface Props {
  postList: PostWithComments[];
  onDeletePost: (value: number) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
}

export const PostList: FC<Props> = ({ postList, onDeletePost, onDeleteComment }) => (
  <ul className="postList">
    {postList.map((post) => {
      return (
        <Fragment key={post.id}>
          <Post
            post={post}
            onDelete={onDeleteComment}
          />
          <button
            type="button"
            onClick={() => {
              onDeletePost(post.id);
            }}
          >
            delete Post
          </button>
        </Fragment>
      );
    })}
  </ul>
);
