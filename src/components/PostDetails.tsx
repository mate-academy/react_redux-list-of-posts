import { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
//import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  //addComment,
  init,
  removeComment,
  setVisible,
} from '../features/comments/commentsSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.posts.selectedPost);
  const comments = useAppSelector(state => state.comments.items);

  const loaded = useAppSelector(state => state.comments.commentsLoaded);
  const hasError = useAppSelector(state => state.comments.commentsError);
  const visible = useAppSelector(state => state.comments.visible);

  useEffect(() => {
    if (post) {
      dispatch(init(post.id));
    }
  }, [post, dispatch]);

  // const handleAddComment = async (commentData: CommentData) => {
  //   if (post) {
  //     dispatch(addComment({ ...commentData, postId: post.id }));
  //   }
  // };

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {post && (
          <>
            <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

            <p data-cy="PostBody">{post.body}</p>
          </>
        )}
      </div>

      <div className="block">
        {!loaded && !hasError && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
