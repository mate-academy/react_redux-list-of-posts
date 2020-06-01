import React from 'react';
import { PostType, UserType, CommentType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store'
import { User } from './User';
import { Comments } from './Comments';


type PropsType = {
  post: PostType;
}

export const Post: React.FC<PropsType> = ({ post }) => {
  const user = useSelector(
    (state: RootState) => state
      .users
      .find((user: UserType) => user.id === post.userId));

  const comments = useSelector(
    (state: RootState) => state
      .comments
      .filter((comment: CommentType) => comment.postId === post.id)
  )

  return (
    <div className="Post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <User name={user.name} email={user.email} address={user.address} />
      <Comments comments={comments} />
    </div>
  )
}



