import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { deleteComment, loadComments } from '../../store/reducers/commentReducer';
import { Loader } from '../Loader';

export const CommentsList: React.FC = () => {
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);
  const dispatch = useDispatch();
  const store = useTypedSelector(state => state);
  const {
    isLoading,
    comments,
  } = store.comment;

  const {
    selectedPostId,
  } = store.post;

  useEffect(() => {
    dispatch(loadComments(selectedPostId));

    return () => {
      setIsCommentsHidden(true);
    };
  }, [selectedPostId]);

  const handleToggleComments = () => {
    setIsCommentsHidden(current => !current);
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      {comments.length
        ? (
          <button
            type="button"
            className="button"
            onClick={handleToggleComments}
          >
            {`${isCommentsHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>
        ) : (
          <p>No comments</p>
        )}

      {!isCommentsHidden && (
        <ul className="PostDetails__list">
          {
            comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          }
        </ul>
      )}
    </div>
  );
};
