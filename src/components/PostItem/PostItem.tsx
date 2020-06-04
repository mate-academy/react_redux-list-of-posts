import React from 'react';
import './PostItem.css';
import { useDispatch } from 'react-redux';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { capitalize } from '../../helpers/capitalize';
import { removePost } from '../../store/posts';

type Props = {
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
};

const PostItem: React.FC<Props> = ({
  title, body, user, comments, id,
}) => {
  const dispatch = useDispatch();

  return (
    <section className="post">

      <h2 className="post__title">
        {capitalize(title)}
      </h2>
      <button
        type="button"
        onClick={() => dispatch(removePost(id))}
      >
        X
      </button>

      <User {...user} />

      <article className="post__text">
        {capitalize(body)}
      </article>

      <CommentList comments={comments} />
    </section>

  );
};


export default PostItem;
