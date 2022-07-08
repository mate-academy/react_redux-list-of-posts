import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { selectors } from '../../store';
import { actions as postDetailsActions } from '../../store/postDetails';
import { actions as commentsActions } from '../../store/comments';

import './PostDetails.scss';

type Props = {
  isClicked: boolean;
  setIsOpenDetails: (v: boolean) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  isClicked,
  setIsOpenDetails,
}) => {
  const [isHideCommets, setIsHideCommets] = useState(false);

  const dispatch = useDispatch();

  const postId = useSelector(selectors.getPostId);
  const post = useSelector(selectors.getPost);
  const comments = useSelector(selectors.getComments);

  const changeIsHideCommets = () => {
    setIsHideCommets(curr => !curr);
  };

  useEffect(() => {
    dispatch(postDetailsActions.loadPostDetails(postId));
    dispatch(commentsActions.loadComments(postId));
    setIsOpenDetails(false);
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isClicked
        ? <Loader />
        : (
          <>
            <section className="PostDetails__post">
              <p>{post?.body}</p>
            </section>

            <section className="PostDetails__comments">
              {!!comments.length && (
                <button
                  type="button"
                  className="button"
                  onClick={changeIsHideCommets}
                >
                  {
                    `${isHideCommets ? 'Show' : 'Hide'}
                    ${comments.length}
                    ${comments.length > 1 ? 'comments' : 'comment'}`
                  }
                </button>
              )}

              {!isHideCommets && (
                <ul className="PostDetails__list">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="
                          PostDetails__remove-button
                          button
                          button--is-light"
                        onClick={() => {
                          dispatch(
                            commentsActions.deleteComment(comment.id, postId),
                          );
                        }}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
});
