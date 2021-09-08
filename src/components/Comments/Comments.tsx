import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../images/delete.svg';
import editIcon from '../../images/edit.svg';
// import { getPostDetails } from '../../helpers/posts';
// import { getPostComments, removeComment, addPostComment } from '../../api/comments';

import { getComment } from '../../api/comments';

import {
  getPostComments,
  getPostCommentsEdit,
  arePostCommentsUpdated
} from '../../store'; // isLoading
import {
  fetchPostComments,
  setCommentEdit,
  setCommentsUpdated,
  removeComment
} from '../../store/commentsReducer'

import { Comment, CommentsEdit } from '../../types';

type Props = {
  postId: number,
};

export const Comments: React.FC<Props> = React.memo(({ postId }) => {
  // const [commentHidden, setCommentHidden] = useState(false);
  const comments: Comment[] | null = useSelector(getPostComments);
  const areCommentsUpdated: boolean = useSelector(arePostCommentsUpdated);
  const commentsEdit: CommentsEdit = useSelector(getPostCommentsEdit);

  const dispatch = useDispatch();
  // const loading = useSelector(isLoading);

  useEffect(() => {
    if (postId > 0) {
      dispatch(fetchPostComments(postId));
      console.log('Comments useeffect postId', postId, areCommentsUpdated);
      dispatch(setCommentEdit(null));
    }

    if (areCommentsUpdated) {
      console.log('Comments commentsUpdated is true in useeffect', postId, areCommentsUpdated);
      dispatch(setCommentsUpdated(false));
    }
  }, [postId, areCommentsUpdated, dispatch]);

  const removeCommentHandler = async (commentId: number) => {
    // setIsLoading(true);
    await removeComment(commentId);
    // dispatch(fetchPost(postId));
    dispatch(setCommentsUpdated(true));
  };

  const editCommentHandler = (commentId: number) => {
    getComment(commentId)
      .then(res => {
        dispatch(setCommentEdit(res));
      });
  };

  // console.log(comments, 333);
  // console.log('Comments commentsUpdated is ', commentsUpdated, postId);
  // console.log(comments, (comments && comments.length));

  // const removeCommentHandler = (commentId: number) => {
    
  //   dispatch(removeComment(commentId));
  // }
  if (comments) {
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
                    editCommentHandler(comment.id);
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
