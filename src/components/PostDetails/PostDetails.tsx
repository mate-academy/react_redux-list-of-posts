import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetailsFromServer, getCommentsFromServer } from '../../store/index';
import { NewCommentForm } from '../NewCommentForm';
// import { Loader } from '../Loader';
import './PostDetails.scss';

import { deleteComment } from '../../api/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);
  const selectedPostDetails = useSelector((state: PostsState) => state.postDetailsSlice);
  const comments = useSelector((state: PostsState) => state.commentsSlice.comments);

  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    dispatch(getPostDetailsFromServer(selectedPostId));
    dispatch(getCommentsFromServer(selectedPostId));
  }, [selectedPostId]);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const getCommentsButton = () => {
    if (comments && comments.length > 0) {
      return (
        <button
          type="button"
          className="button"
          onClick={toggleComments}
        >
          {!commentsVisible
            ? `Show ${comments.length} comments`
            : `Hide ${comments.length} comments`}
        </button>
      );
    }

    return (
      <span>No comments found</span>
    );
  };

  const deleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await deleteComment(event.currentTarget.name);
    dispatch(getCommentsFromServer(selectedPostId));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPostId !== 0 ? (
        <>
          <section className="PostDetails__post">
            <p>{selectedPostDetails && selectedPostDetails.title}</p>
          </section>

          <section className="PostDetails__comments">
            {getCommentsButton()}

            <ul className="PostDetails__list">
              {comments && commentsVisible && comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    name={String(comment.id)}
                    onClick={deleteHandler}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      ) : (
        <span>Please select a post to see details</span>
      )}
    </div>
  );
};
