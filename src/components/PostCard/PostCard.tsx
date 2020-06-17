import React from 'react';
import { useDispatch } from 'react-redux';

import './PostCard.css';
import { UserCard } from '../UserCard/UserCard';
import { CommentsList } from '../CommentsList/CommentsList';
import { RemoveButton } from '../RemoveButton/RemoveButton';
import { removePost } from '../../store/posts';


type Props = PreparedPost;

export const PostCard: React.FC<Props> = ({
  title, body, user, comments, id,
}) => {
  const dispatch = useDispatch();

  return (
    <li className="post-list__post post">
      <div className="post__header">
        <h2 className="post__title">{title}</h2>
        <RemoveButton size="large" onClick={() => dispatch(removePost(id))} />
      </div>
      <p className="post__text">{body}</p>
      {user && <UserCard {...user} key={user.id} />}
      {comments && <CommentsList commentsList={comments} />}
    </li>
  );
};
