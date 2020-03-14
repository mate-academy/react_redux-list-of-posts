import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { PostsWithUserAndComments } from '../../constants';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import { deletePost } from '../../store/actionCreators';

interface Props {
  post: PostsWithUserAndComments;
  deletePost: (value: number) => void;
}

export const PostTemplate: FC<Props> = (props) => {
  const { deletePost: deletePostThunk } = props;
  const {
    title,
    body,
    id,
    user,
    comments,
  } = props.post;

  const handleDelete = useCallback(() => deletePostThunk(id),
    [id, deletePostThunk]);

  return (
    <div className="list__item">
      <div className="card">
        <h4 className="card-header">{title}</h4>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              {body}
            </p>
            <footer className="blockquote-footer">
              <User user={user} />
            </footer>
          </blockquote>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete post
          </button>
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = { deletePost };

export const Post = connect(null, mapDispatchToProps)(PostTemplate);
