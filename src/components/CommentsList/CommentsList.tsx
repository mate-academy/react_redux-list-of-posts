import { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentsLoad } from '../../redux/actions';
import { RootState } from '../../redux/rootReducer';
import { Comment } from '../../Types/Comment';
import { CommentComponent } from '../CommentComponent/CommentComponent';

type Props = {
  id?: number,
};

export const CommentsList: React.FC<Props> = ({ id }) => {
  const [searchParams] = useSearchParams() || '';
  const hideCommentsQuery = searchParams.get('hideComments') || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const comments: Comment[] = useSelector((state: RootState) => {
    const { commentsReducer } = state;

    return commentsReducer.comments;
  });

  useEffect(() => {
    dispatch(commentsLoad());
  }, []);

  const handleButtonHiddenChange = useCallback(() => {
    if (hideCommentsQuery) {
      searchParams.delete('hideComments');
    } else {
      searchParams.set('hideComments', 'true');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [hideCommentsQuery]);

  return (
    <>
      {comments.filter(comment => comment.postId === id).length ? (
        <div className="PostDetails__comments">
          <button
            type="button"
            onClick={handleButtonHiddenChange}
            className="PostDetails__hide-button button"
          >
            {!hideCommentsQuery ? 'hide comments' : 'show comments'}
          </button>
          {!hideCommentsQuery && (
            <ul className="PostDetail__list">
              {comments?.filter(comment => comment.postId === id).map(comment => (
                <CommentComponent
                  key={comment.id}
                  comment={comment}
                  id={id}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="PostDetails__empty-comments">No comments yet</p>
      )}
    </>
  );
};
