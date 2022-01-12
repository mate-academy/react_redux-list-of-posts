/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { PostsActionsCreator } from '../../../store/posts';
import { Comment } from '../../../types/Comment';

type Props = {
  postId: number | undefined,
};

export const AddComment: FC<Props> = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { user } = useTypedSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.length !== 0) {
      const data: Partial<Comment> = {
        email: user.username,
        name: user.username,
        body: comment,
        postId,
      };

      dispatch(PostsActionsCreator.sendComments(data));
      setComment('');
    } else {
      setIsValid(true);
    }
  };

  return (
    <form
      className="test"
      onSubmit={handleSubmit}
    >
      <div className="form-floating">
        <textarea
          className={classNames('form-control mb-3', { 'is-invalid': isValid })}
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={{ height: '100px' }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={() => setIsValid(false)}
        />
        <label htmlFor="floatingTextarea">
          Add Comments
        </label>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Send
        </button>
      </div>
    </form>
  );
};
