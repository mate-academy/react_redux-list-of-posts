import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../images/delete.svg';
// import { getPostDetails } from '../../helpers/posts';
// import { getPostComments, removePostComment, addPostComment } from '../../api/comments';

import {
  getPostComments,
  areCommentsUpdated
} from '../../store'; // isLoading
import {
  fetchPostComments,
  setCommentsUpdated,
  removePostComment
} from '../../store/commentsReducer'

import { Comment } from '../../types';

export type PropState = {
  postId: number,
};

export const Comments: React.FC<PropState> = React.memo(({ postId }) => {
  // const [commentHidden, setCommentHidden] = useState(false);
  const comments: Comment[] | null = useSelector(getPostComments);
  const commentsUpdated: boolean = useSelector(areCommentsUpdated);

  const dispatch = useDispatch();
  // const loading = useSelector(isLoading);

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPostComments(postId));
      console.log('Comments useeffect postId', postId, commentsUpdated);
      // dispatch(setCommentsUpdated(false));
    }

    if (commentsUpdated) {
      console.log('Comments commentsUpdated is true in useeffect', postId, commentsUpdated);
      dispatch(setCommentsUpdated(false));
    }
  }, [postId, commentsUpdated, dispatch]);

  const removeCommentHandler = async (commentId: number) => {
    // setIsLoading(true);
    await removePostComment(commentId);
    // dispatch(fetchPost(postId));
    dispatch(setCommentsUpdated(true));
  };

  // console.log(comments, 333);
  // console.log('Comments commentsUpdated is ', commentsUpdated, postId);
  // console.log(comments, (comments && comments.length));

  // const removeCommentHandler = (commentId: number) => {
    
  //   dispatch(removePostComment(commentId));
  // }
  if (comments && comments.length) {
    console.log(comments);
    return (
      <ul className="PostDetails__list">
        {comments.map(comment => (
          <li className="PostDetails__list-item" key={comment.id}>
            <button
              type="button"
              className="PostDetails__remove-button button"
              onClick={() => {
                if (comment.id) {
                  removeCommentHandler(comment.id);
                }
              }}
            >
              <img src={deleteIcon} alt="delete icon"></img>
            </button>
            <p>{comment.body} <sub>{comment.id} post {postId}</sub></p>
          </li>
        ))}
      </ul>
    )
  } else {
    return (
      <p className="info">No comments</p>
    );
  }
});
