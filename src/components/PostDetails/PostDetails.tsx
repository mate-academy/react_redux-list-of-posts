import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import { addComment, getPostComments, removeComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';
import { NewComment } from '../../types/NewComment';
import {
  getMessage,
  getPost,
  getPostId,
  isLoading,
} from '../../store/selectors';
import './PostDetails.scss';
import { loadPost } from '../../store';
import { Post } from '../../types/Post';
import { setPost } from '../../store/post';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId: number | null = useSelector(getPostId);
  const details: Post = useSelector(getPost);
  const isDetailsLoading: boolean = useSelector(isLoading);
  const message: string = useSelector(getMessage);

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  const handleVisibilityComments = useCallback(() => {
    setIsVisibleComments(!isVisibleComments);
  }, [isVisibleComments]);

  const updateComments = useCallback(async () => {
    if (selectedPostId) {
      const userPostComments = await getPostComments(selectedPostId);

      setComments(userPostComments);
    }
  }, [selectedPostId]);

  const handleRemoveComment = useCallback(async (commentId: number) => {
    try {
      setIsCommentsLoading(true);
      await removeComment(commentId);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  }, [selectedPostId, comments]);

  const handleAddComment = useCallback(async (newComment: NewComment) => {
    try {
      setIsCommentsLoading(true);
      await addComment(newComment);
    } finally {
      setIsCommentsLoading(false);
      updateComments();
    }
  }, [selectedPostId, comments]);

  const isComments = useMemo(() => {
    return comments && comments.length > 0;
  }, [comments]);

  useEffect(() => {
    if (selectedPostId) {
      dispatch(loadPost(selectedPostId));
    } else {
      dispatch(setPost(null));
    }
  }, [selectedPostId]);

  return (
    <>
      <div className="PostDetails">
        <h2>Post details:</h2>
        {(isDetailsLoading && !details) && <Loader />}
        {message}
        {(!isDetailsLoading || details) && (
          <>
            <section className="PostDetails__post">
              <p>{details?.body}</p>
            </section>

            <section className="PostDetails__comments">
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
                  onClick={handleVisibilityComments}
                >
                  {isVisibleComments && `Hide ${comments?.length} comments`}
                  {!isVisibleComments && `Show ${comments?.length} comments`}
                </button>
              )}

              {isCommentsLoading && <Loader />}
              {!isCommentsLoading && (
                <ul className="PostDetails__list" data-cy="postDetails">
                  {isVisibleComments && comments?.map((comment) => (
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
              )}
            </section>
            {details?.body && (
              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm
                    handleAddComment={handleAddComment}
                    selectedPostId={selectedPostId}
                  />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};
