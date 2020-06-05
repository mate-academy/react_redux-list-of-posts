import React from 'react';
import User from '../User/User';
import Post from '../Post/Post';
import CommentsList from '../CommentList/CommentList';
import './Postlist.scss';

type Props = {
  posts: PostWithUserAndComment[];
};

const PostList: React.FC<Props> = ({ posts }) => {

  return (

    <ul className="postList">
      {posts.map((post: PostWithUserAndComment) => (
        <div key={post.id} className="postList__wrapper">
          <li className="postList__item">
            <User
              {...post.user}
            />
            <Post
              {...post}
            />
          </li>
          <CommentsList
            comments={post.comments}
          />
        </div>
      ))}
    </ul>
  );
};

export default PostList;
