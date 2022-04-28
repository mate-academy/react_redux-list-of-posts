import React, { useEffect } from 'react';

import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  changeCommentsVisibility,
  deleteComment,
  getCommentsByPostId,
} from '../../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPostId } = useAppSelector(state => state.postReducer);
  const { posts } = useAppSelector(state => state.postReducer);
  const {
    comments,
    isCommentsVisible,
  } = useAppSelector(state => state.commentsReducer);

  const selectedPost = posts.find((post: Post) => post.id === selectedPostId);

  useEffect(() => {
    if (selectedPostId) {
      dispatch(getCommentsByPostId(selectedPostId));
    }
  }, [selectedPostId]);

  const onHandleRemoveButton = async (commentId: number, postId: number) => {
    await dispatch(deleteComment(commentId));
    await dispatch(getCommentsByPostId(postId));
  };

  const onChangeCommentsStatus = () => {
    dispatch(changeCommentsVisibility(!isCommentsVisible));
  };

  return (
    selectedPost ? (
      <>
        <div className="PostDetails">
          <h2>Post details:</h2>
          <section className="PostDetails__post">
            <p>{selectedPost?.body}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length !== 0 && (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={onChangeCommentsStatus}
                >
                  {`${!isCommentsVisible ? 'Show' : 'Hide'} ${comments.length} comments`}
                </button>

                {isCommentsVisible && (
                  <ul className="PostDetails__list">
                    {comments.map((comment: PostComment) => (
                      <li
                        className="PostDetails__list-item"
                        key={comment.id}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          // eslint-disable-next-line max-len
                          onClick={() => onHandleRemoveButton(comment.id, comment.postId)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </div>
      </>
    ) : (
      <h2>
        Post not selected.
      </h2>
    )
  );
};
