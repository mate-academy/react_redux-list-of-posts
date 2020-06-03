import React from 'react';
import CommentList from './CommentList';
import UserInfo from './UserInfo';

type Props = {
  author: UserProps;
  comments: CommentProps[];
  postId: number;
};

const User: React.FC<Props> = ({ author, comments, postId }) => (
  <>
    <div className="user_info">
      <h4 className="author">
        Author:&nbsp;
        {author.name}
      </h4>
      <p className="email">
        Email:&nbsp;
        {author.email}
      </p>
    </div>
    <UserInfo author={author} />
    <CommentList comments={comments} postId={postId} />
  </>
);

export default User;
