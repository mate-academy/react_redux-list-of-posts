import React from 'react';
import CommentList from './commentList';
import UserInfo from './userCard';

type Props = {
  author: UserProps;
  comments: CommentProps[];
  postId: number;
};

const User: React.FC<Props> = ({ author, comments, postId }) => (
  <>
    <div className="post__user-info">
      <h4 className="post__author">
        Author:&nbsp;
        {author.name}
      </h4>
      <a
        href={`mailto:${author.email}`}
        className="post__email"
      >
        Email:&nbsp;
        {author.email}
      </a>
    </div>
    <UserInfo author={author} />
    <CommentList comments={comments} postId={postId} />
  </>
);

export default User;
