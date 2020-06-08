import React from 'react';
import { useDispatch } from 'react-redux';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { capitalize } from '../../helpers/capitalize';
import { removePost } from '../../store/posts';
import './Post.scss';

type Props = {
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
};

const Post: React.FC<Props> = ({
  title, body, user, comments, id,
}) => {
  const dispatch = useDispatch();

  return (
    <section className="Post">

      <h2 className="Post__Title">
        {capitalize(title)}
      </h2>
      <User {...user} />

      <article className="Post__Text">
        {capitalize(body)}
      </article>
      <button
        type="button"
        onClick={() => dispatch(removePost(id))}
      >
        Delete
      </button>
      <CommentList comments={comments} />
    </section>
  );
};


export default Post;
