import React, { useState } from "react";
import { addComment, fetchPostInfo } from "../../store/post";
import { getActivePostId } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";

import "./NewCommentForm.scss";

export const NewCommentForm: React.FC<{
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLoading }) => {
  const activePostId = useSelector(getActivePostId);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const reset = () => {
    setUserName("");
    setEmail("");
    setBody("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};
