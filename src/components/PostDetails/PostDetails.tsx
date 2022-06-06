import React, {
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';
import {
  getComments,
  getCommentsVisibility,
  getMessage,
  getPost,
  getPostId,
  isLoading,
} from '../../store/selectors';
import './PostDetails.scss';
import { loadPostDetails } from '../../store';
import { Post } from '../../types/Post';
import { setPost } from '../../store/post';
import { setComments } from '../../store/comments';
import { toggleVisibility } from '../../store/commentsVisibility';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId: number | null = useSelector(getPostId);
  const details: Post = useSelector(getPost);
  const comments: Comment[] = useSelector(getComments);
  const isDataLoading: boolean = useSelector(isLoading);
  const message: string = useSelector(getMessage);
  const isCommentsVisible: boolean = useSelector(getCommentsVisibility);

  const isComments = useMemo(() => {
    return comments && comments.length > 0;
  }, [comments]);

  const handleRemoveComment = (commentId: number) => {
    const updatedComments = comments.filter((comment) => (
      comment.id !== commentId
    ));

    dispatch(setComments(updatedComments));
  };

  useEffect(() => {
    if (selectedPostId) {
      dispatch(loadPostDetails(selectedPostId));
    } else {
      dispatch(setPost(null));
      dispatch(setComments(null));
    }
  }, [selectedPostId]);

  return (
    <>
      <div className="PostDetails">
        <h2>Post details:</h2>
        {(isDataLoading && !details) && <Loader />}
        {message}
        {(!isDataLoading || details) && (
          <>
            <section className="PostDetails__post">
              <p>{details?.body}</p>
            </section>

            <section className="PostDetails__comments">
              {(isDataLoading && !comments) && <Loader />}
              {(!isDataLoading || comments) && (
                <>
                  {details?.body && !isComments && (
                    <button
                      type="button"
                      className="PostDetails__nocomments
                      button"
                    >
                      No comments
                    </button>
                  )}

                  {details?.body && isComments && (
                    <button
                      type="button"
                      className="button"
                      onClick={() => dispatch(toggleVisibility())}
                    >
                      {isCommentsVisible && `Hide ${comments?.length} comments`}
                      {!isCommentsVisible && `Show ${comments?.length} comments`}
                    </button>
                  )}

                  <ul className="PostDetails__list" data-cy="postDetails">
                    {isCommentsVisible && comments?.map((comment) => (
                      <li
                        className="PostDetails__list-item"
                        key={comment.id}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => handleRemoveComment(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
            {details?.body && (
              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};
