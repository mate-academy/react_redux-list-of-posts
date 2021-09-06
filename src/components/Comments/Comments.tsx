import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../images/delete.svg';
import editIcon from '../../images/edit.svg';
// import { getPostDetails } from '../../helpers/posts';
// import { getPostComments, removePostComment, addPostComment } from '../../api/comments';

import {
  getPostComments,
  getPostCommentsEdit,
  areCommentsUpdated
} from '../../store'; // isLoading
import {
  fetchPostComments,
  setCommentsUpdated,
  removePostComment
} from '../../store/commentsReducer'

import { Comment, CommentsEdit } from '../../types';

type Props = {
  postId: number,
};

export const Comments: React.FC<Props> = React.memo(({ postId }) => {
  // const [commentHidden, setCommentHidden] = useState(false);
  const comments: Comment[] | null = useSelector(getPostComments);
  const commentsUpdated: boolean = useSelector(areCommentsUpdated);
  const commentsEdit: CommentsEdit = useSelector(getPostCommentsEdit);

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
  if (comments) {
    console.log(comments, 'commentsEdit', commentsEdit);
    return (
      <ul className="PostDetails__list">
        {comments.map(comment => (
          <li className="PostDetails__list-item" key={comment.id}>
            <span>{comment.body} <sub>{comment.id} post {postId}</sub></span>
            <div>
              {commentsEdit.includes(comment.id) && (
                <button
                  type="button"
                  className="button button--icon"
                  onClick={(ev) => {
                    ev.preventDefault();

                    console.log('edit');
                  }}
                >
                  <img src={editIcon} alt="edit icon"></img>
                </button>
              )}
              <button
                type="button"
                className="button button--icon"
                onClick={(ev) => {
                  ev.preventDefault();

                  if (comment.id) {
                    removeCommentHandler(comment.id);
                  }
                }}
              >
                <img src={deleteIcon} alt="delete icon"></img>
              </button>
            </div>
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
