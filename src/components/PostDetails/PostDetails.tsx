import React, { useEffect } from 'react';
import './PostDetails.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCommentsByPostId, removeCommentById } from '../../store/reducers/ActionCreators';
import { Loader } from '../Loader';
import { commentSlice } from '../../store/reducers/CommentsSlice';
import { NewCommentForm } from '../NewCommentForm';

export const PostDetails: React.FC = () => {
  const { posts, selectedPostId } = useAppSelector(state => state.postReducer);
  const {
    comments,
    areCommentsLoading,
    areCommentVisible,
    errorLoadingComments,
  } = useAppSelector(state => state.commentReducer);
  const post = posts.find(singlePost => singlePost.id === selectedPostId);
  const dispatch = useAppDispatch();
  const { setCommentVisible } = commentSlice.actions;

  useEffect(() => {
    if (selectedPostId) {
      dispatch(fetchCommentsByPostId(selectedPostId));
    }
  }, [selectedPostId]);

  const onRemoveComment = async (commentId: number, postId: number) => {
    await dispatch(removeCommentById(commentId));
    await dispatch(fetchCommentsByPostId(postId));
  };

  if (post) {
    return (
      <div className="PostDetails">
        <h2>
          {`Post details: ${post.title}`}
        </h2>

        <section className="PostDetails__post">
          <p>{post.title}</p>
          <p>{post.body}</p>
        </section>

        {errorLoadingComments}

        {areCommentsLoading ? <Loader /> : (
          <section className="PostDetails__comments">
            {areCommentVisible && comments.length > 0
              ? (
                <button
                  onClick={() => dispatch(setCommentVisible(false))}
                  type="button"
                  className="button"
                >
                  {`Hide ${comments.length} comments`}
                </button>
              )
              : (
                <button
                  onClick={() => dispatch(setCommentVisible(true))}
                  type="button"
                  className="button"
                >
                  {comments.length > 0 ? `Show ${comments.length} comments` : 'No comments'}
                </button>
              )}

            { areCommentVisible && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      onClick={() => onRemoveComment(comment.id, post.id)}
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm />
          </div>
        </section>
      </div>
    );
  }

  return <h2>Any post is not selected yet</h2>;
};
