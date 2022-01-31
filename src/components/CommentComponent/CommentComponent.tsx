import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { commentDelete, commentUpdate } from '../../redux/actions';
import { Comment } from '../../Types/Comment';

type Props = {
  comment: Comment,
  id?: number,
};

export const CommentComponent: React.FC<Props> = ({ comment, id }) => {
  const [commentText, setCommentText] = useState('');

  const dispatch = useDispatch();

  const handleUpdate = (e: any, commentId: number) => {
    e.preventDefault();
    let updateComment = {} as Comment;

    if (id && commentText.trim()) {
      updateComment = {
        body: commentText,
        postId: +id,
      };
    }

    dispatch(commentUpdate(updateComment, commentId));
  };

  const handleInputChange = (e: any) => {
    setCommentText(e.target.value);
  };

  const handleButtonDeleteChange = (commentId: number) => {
    dispatch(commentDelete(commentId));
  };

  useEffect(() => {
    if (comment.body) {
      setCommentText(comment.body);
    }
  }, [comment]);

  return (
    <li>
      <form
        onSubmit={(e) => comment.id && handleUpdate(e, comment.id)}
        className="PostDetails__list-item"
      >
        <input
          type="text"
          value={commentText}
          onChange={handleInputChange}
          onMouseLeave={(e) => comment.id && handleUpdate(e, comment.id)}
          className="PostDetails__list-info"
        />
        <input type="submit" hidden />
        <button
          type="button"
          onClick={() => comment.id && handleButtonDeleteChange(comment.id)}
          className="PostDetails__remove-button"
        >
          X
        </button>
      </form>
    </li>
  );
};
