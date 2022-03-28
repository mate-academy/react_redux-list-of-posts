import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsAction, loadPostAction } from '../../store/actions';
import {
  getCommentsSelector,
  getPostIdSelector,
  getPostSelector,
  getSelectedPost,
} from '../../store/selectors';
import { getPost } from '../../posts';
import { addComment, deleteComment, getComments } from '../../comments';

export const Post: React.FC = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [currentInputComment, setCurrentInputComment] = useState('');
  const [currentInputName, setCurrentInputName] = useState('');
  const [currentInputEmail, setCurrentInputEmail] = useState('');
  const dispatch = useDispatch();

  const post = useSelector(getPostSelector);
  const comments = useSelector(getCommentsSelector);
  const postId = useSelector(getPostIdSelector);
  const selectedPost = useSelector(getSelectedPost);

  useEffect(() => {
    const loadPostInfoFromServer = async () => {
      const postFromServer = await getPost(postId);
      const commentsFromServer = await getComments(postId);

      dispatch(loadCommentsAction(commentsFromServer));
      dispatch(loadPostAction(postFromServer));
    };

    if (postId) {
      loadPostInfoFromServer();
    }
  }, [postId]);

  const changeCommentsStatus = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const handlerDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    const commentsFromServer = await getComments(postId);

    dispatch(loadCommentsAction(commentsFromServer));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'name':
        setCurrentInputName(event.target.value);
        break;
      case 'email':
        setCurrentInputEmail(event.target.value);
        break;
      case 'comment':
        setCurrentInputComment(event.target.value);
        break;
      default:
    }
  };

  const addNewComment = async () => {
    const newComment = {
      postId,
      name: currentInputName,
      email: currentInputEmail,
      body: currentInputComment,
    };

    await addComment(newComment);
    const commentsFromServer = await getComments(postId);

    dispatch(loadCommentsAction(commentsFromServer));

    setCurrentInputName('');
    setCurrentInputEmail('');
    setCurrentInputComment('');
  };

  return (
    <div className="post">
      {
        selectedPost ? (
          <div>
            <h1 className="post__title">Selected post</h1>
            <p className="post__name">{post?.title}</p>
            <b>Content:</b>
            <p>{post?.body}</p>
            <p className="post__add-comment">Add comment</p>
            <form className="post__form" action="">
              <label
                htmlFor="name"
                className="post__form__label"
              >
                Name
                <input
                  className="input is-link is-small post__form__input"
                  name="name"
                  type="text"
                  onChange={handleInput}
                  value={currentInputName}
                  minLength={2}
                />
              </label>
              <label
                className="post__form__label"
                htmlFor="email"
              >
                Email
                <input
                  className="input is-link is-small post__form__input"
                  name="email"
                  type="email"
                  onChange={handleInput}
                  value={currentInputEmail}
                />
              </label>
              <label
                className="post__form__label"
                htmlFor="comment"
              >
                Comment
                <input
                  className="input is-link is-small post__form__input"
                  name="comment"
                  type="text"
                  onChange={handleInput}
                  value={currentInputComment}
                  minLength={2}
                />
              </label>
              <button
                type="button"
                onClick={addNewComment}
                className="button is-dark is-small post__form__button"
              >
                Add comment
              </button>
            </form>
            <br />
            <button
              type="button"
              onClick={changeCommentsStatus}
            >
              {isCommentsVisible ? 'Hide comments' : 'Show comments'}
            </button>
            {isCommentsVisible && (
              comments.length ? (
                comments.map((comment) => (
                  <p className="post__comment" key={comment.id}>
                    <p className="post__comment__name">{comment.name}</p>
                    <div className="post__comment__content">
                      <p>{comment.body}</p>
                      <button
                        className="post__comment__button"
                        type="button"
                        onClick={() => handlerDeleteComment(comment.id)}
                      >
                        x
                      </button>
                    </div>
                  </p>
                ))
              ) : (
                <p>Comments not found</p>
              )
            )}
          </div>
        ) : (
          <p className="post__not-found">Post is not selected</p>
        )
      }

    </div>
  );
};
