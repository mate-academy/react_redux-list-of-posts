import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { loadPost } from '../../store/reducers/postReducer';
import { CommentsList } from '../CommentsList';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();

  const {
    selectedPostId,
    isLoadingPost,
    selectedPost,
  } = useTypedSelector(state => state.post);

  useEffect(() => {
    dispatch(loadPost(selectedPostId));
  }, [selectedPostId]);

  if (isLoadingPost) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      {!!selectedPost && (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{selectedPost.body}</p>
          </section>

          <section className="PostDetails__comments">
            <CommentsList />
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
