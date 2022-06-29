import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getComments, delComment } from '../../api/comments';
import { getPostbyId } from '../../api/posts';

import {
  getCommentsSelector,
  getPostTitleSelector,
  getSelectedPostIdSelector,
} from '../../store/selectors';
import {
  setCommentsAction,
  setIsLoadingAction,
  setPostTitleAction,
} from '../../store';
import { Post } from '../../react-app-env';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const postTitle = useSelector(getPostTitleSelector);
  const commentsList = useSelector(getCommentsSelector);

  const postId = useSelector(getSelectedPostIdSelector);
  const [visiblecomments, setVisiblecomments] = useState(false);

  const findPost = async () => {
    if (postId) {
      const result:Post = await getPostbyId(postId);

      dispatch(setPostTitleAction(result.title));
    }
  };

  useEffect(() => {
    dispatch(setIsLoadingAction(true));
    findPost();
    dispatch(setIsLoadingAction(false));
  }, []);

  const findcomments = async () => {
    if (postId) {
      const result = await getComments(postId);

      dispatch(setCommentsAction(result));
    }
  };

  const deletecomment = async (id: number) => {
    if (commentsList) {
      await delComment(id);
      findcomments();
    }
  };

  useEffect(() => {
    dispatch(setIsLoadingAction(true));
    findcomments();
    dispatch(setIsLoadingAction(false));
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postId && (
        <>
          <section className="PostDetails__post">
            <p>
              {postTitle}
            </p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisiblecomments(!visiblecomments);
              }}
            >
              {commentsList && ((visiblecomments)
                ? `Show ${commentsList.length} comments`
                : `Hide ${commentsList.length} comments`)}
            </button>
            <ul
              className={visiblecomments
                ? 'PostDetails__visiblelist'
                : 'PostDetails__list'}
            >
              {commentsList && commentsList.map(comm => (
                <li
                  className="PostDetails__list-item"
                  key={comm.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deletecomment(comm.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comm.body}</p>
                </li>
              ))}
              {dispatch(setIsLoadingAction(false))}
            </ul>
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
