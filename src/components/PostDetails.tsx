import React, { useEffect } from 'react';
import { Loader } from './Loader';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getComments, setSelectedComments } from './CommentsContext';
import { deleteSelectedComment } from './DelComentContext';

export const PostDetails = () => {
  const loading = useSelector((state: RootState) => state.comments.loading);
  const post = useSelector((state: RootState) => state.userPosts.selectedPost);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const hasError = useSelector((state: RootState) => state.comments.error);
  const selected = useSelector((state: RootState) => state.comments.selectedComment?.id);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if(post?.id) {
      dispatch(getComments(post.id));
    }
    // if(selected) {

    // }
  }, [post?.id, selected]);

  const handleDeleteComent = (id: number) => {
    dispatch(deleteSelectedComment(id))
  }

console.log(selected)

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loading && !hasError && comments.length === 0 && 
        (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {
        // loaded && !hasError && comments.length > 0 && 
        (
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
                    onClick={() => {setSelectedComments(comment), handleDeleteComent(comment.id)}} 
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

        {
        // loaded && !hasError && 
        (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            // onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {/* {
        // loaded && !hasError && 
        (
          <NewCommentForm 
          onSubmit={addComment} 
          />
        )} */}
      </div>
    </div>
  );
};
