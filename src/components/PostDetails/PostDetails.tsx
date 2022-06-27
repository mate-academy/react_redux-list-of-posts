import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, getPostComments } from '../../helpers/api';
import { PostsActionCreators }
  from '../../redux/reducers/posts/action-creators';
import {
  Comments,
  SelectedPost,
  Details,
} from '../../redux/reducers/posts/selectors';
import { CommentType } from '../../types/CommentType';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const comments = useSelector(Comments);
  const selectedPostId = useSelector(SelectedPost);
  const postDetails = useSelector(Details);

  const [isCommentShow, setIsCommentShow] = useState<boolean>(true);

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId)
        .then(data => dispatch(PostsActionCreators.setPostDetails(data)));
      getPostComments(selectedPostId)
        .then(data => dispatch(PostsActionCreators.setComments(data)));
    }
  }, [selectedPostId]);

  const deleteCommentHandler = (comment: CommentType) => {
    dispatch(PostsActionCreators.deleteCommentAction(comment.id));
  };

  return (
    <div className="PostDetails">
      {postDetails && (
        <>
          <h2>{`Post details: ${selectedPostId}`}</h2>

          <section className="PostDetails__post">
            <p>{postDetails.title}</p>
          </section>

          {comments.length > 0 && (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setIsCommentShow(!isCommentShow)}
              >
                {isCommentShow ? (
                  `Hide ${comments.length} comments`
                ) : (
                  `Show ${comments.length} comments`
                )}
              </button>

              {isCommentShow && (
                <ul className="PostDetails__list" data-cy="postDetails">
                  {comments.map((comment: CommentType) => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => deleteCommentHandler(comment)}
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
              {selectedPostId && (
                <NewCommentForm />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
