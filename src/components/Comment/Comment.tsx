import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { AllActions, deleteComment } from '../../store';
import './Comment.scss';

type Props = {
  name: string;
  email: string;
  body: string;
  id: number;
};

const Comment: React.FC<Props> = ({
  name, email, body, id,
}) => {
  const dispatch = useDispatch<Dispatch<AllActions>>();

  return (
    <>
      <div className="comment">
        <div className="comment__name comment__indentation">
          <strong>Comment by:</strong>
          {' '}
          { name }
          <br />
        </div>
        <div className="comment__email comment__indentation">
          <strong>Email:</strong>
          <a
            href={`mailto:${email}`}
            className="comment__email-link comment__indentation"
          >
            {email}
          </a>
        </div>
      </div>
      <div className="comment__text comment__indentation">
        {body}
      </div>
      <button
        type="button"
        onClick={() => dispatch(deleteComment(id))}
      >
        delete comment
      </button>
    </>
  );
};

export default Comment;
