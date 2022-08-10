import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import {
  fetchPostDetailsByPostId,
  fetchComentsByPostId,
  deletePostComments,
} from '../../store/postDetailsSlice';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [visibleComments, setVisibleComments] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const selectPostId = useAppSelector(state => state
    .posts.selectedPostId);

  const postDetails = useAppSelector(state => state
    .postDetails.postDetails);

  const commentsOfPost = useAppSelector(state => state
    .postDetails.commentsOfPost);

  useEffect(() => {
    if (selectPostId) {
      dispatch(fetchComentsByPostId(selectPostId));
      dispatch(fetchPostDetailsByPostId(selectPostId));
    }
  }, [selectPostId]);

  return (
    <>
      {selectPostId ? (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">

            <p>{postDetails?.body}</p>
          </section>

          <section className="PostDetails__comments">

            {visibleComments ? (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setVisibleComments(false);
                }}
              >
                Hide comments
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setVisibleComments(true);
                }}
              >
                Show comments
              </button>
            )}

            {visibleComments && commentsOfPost?.map(postComment => (
              <ul
                key={postComment.id}
                className="PostDetails__list"
              >
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      dispatch(deletePostComments(postComment.id));
                    }}
                  >
                    X
                  </button>
                  <p>{postComment.body}</p>
                </li>
              </ul>

            ))}

          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </div>
      ) : (
        <div>
          <p>Please press the open button to display</p>
          <p>more detailed information about the post</p>
        </div>

      )}

    </>

  );
};
