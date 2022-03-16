import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getComments } from '../../api/comments';
import { changeCommentsVisibilityAction, loadCommentsAction } from '../../store/actions';
import { getCommentsSelector, getCommentsVisibilitySelector } from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
  posts: Post[],
};

export const PostDetails: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { postId, posts } = props;
  const comments = useSelector(getCommentsSelector);
  const isCommentsHidden = useSelector(getCommentsVisibilitySelector);

  useEffect(() => {
    const loadCommentsFromServer = async () => {
      const commentsFromServer = await getComments(postId);

      dispatch(loadCommentsAction(commentsFromServer));
    };

    loadCommentsFromServer();
  }, [postId]);

  const handleRemoveComment = async (comment: Comment) => {
    await deleteComment(comment.id);

    dispatch(loadCommentsAction(await getComments(postId)));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {!!postId && (
        <>
          <section className="PostDetails__post">
            <p>{posts.find(post => post.id === postId)?.title}</p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => dispatch(changeCommentsVisibilityAction(isCommentsHidden))}
            >
              {!isCommentsHidden ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>
            {!isCommentsHidden
              && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleRemoveComment(comment)}
                      >
                        X
                      </button>
                      <p>{comment.name}</p>
                    </li>
                  ))}
                </ul>
              )}
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm postId={postId} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
