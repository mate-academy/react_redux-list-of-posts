import React, { useState } from "react";
import { addComment, fetchPostInfo } from "../../store/post";
import { getActivePostId } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";

import "./NewCommentForm.scss";

export const NewCommentForm: React.FC<{
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLoading }) => {
  const activePostId = useSelector(getActivePostId);
  const [comment, setComment] = useState({
    userName: "",
    email: "",
    body: "",
  });
  const { userName, email, body } = comment;

  const dispatch = useDispatch();

  const reset = () => {
    setComment({ userName: "", email: "", body: "" });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (userName && email && body) {
      const comment = { name: userName, email, body, postId: activePostId };
      await addComment(comment);
      dispatch(fetchPostInfo(activePostId, setIsLoading));
      reset();
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          className="NewCommentForm__input"
          onChange={(e) => setComment({ ...comment, userName: e.target.value })}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => setComment({ ...comment, email: e.target.value })}
          value={email}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
          value={body}
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};
