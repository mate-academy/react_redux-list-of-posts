import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment, deleteComment, getPostComments, getPostDetails,
} from '../../helpers/posts';
import { PostDetailsUi } from './PostDetailsUi';
import './PostDetails.scss';
import { getPostCommentSelector, getPostDetailSelector, getPostIdSelector } from '../../store/selectors';
import { loadCommentsdAction, loadPostDetailAction } from '../../store/actions';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const comments = useSelector(getPostCommentSelector);
  const postDetails = useSelector(getPostDetailSelector);
  const selectedPostId = useSelector(getPostIdSelector);
  const [initialize, setInitialize] = useState(false);
  const [isHidden, setHidden] = useState(false);

  const loadData = async () => {
    if (selectedPostId !== 0) {
      setInitialize(true);
      const [postFromServer, commentsFromServer] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      dispatch(loadPostDetailAction(postFromServer));
      dispatch(loadCommentsdAction(commentsFromServer));
      setInitialize(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedPostId]);

  const handleVisabiliti = () => {
    setHidden(!isHidden);
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(commentId);
    loadData();
  };

  const handleAdd = async (comment: NewComment) => {
    await addComment(comment);

    loadData();
  };

  return (
    postDetails && (
      <PostDetailsUi
        isHidden={isHidden}
        comments={comments}
        initialize={initialize}
        postDetails={postDetails}
        selectedPostId={selectedPostId}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleVisabiliti={handleVisabiliti}
      />
    )
  );
};
