import React, { useState } from "react";
import { addComment, fetchPostInfo } from "../../store/post";
import { getActivePostId } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import "./NewComment.scss";

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          onChange={(event) => setComment({ ...comment, userName: event.target.value })}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setComment({ ...comment, email: event.target.value })}
          value={email}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setComment({ ...comment, body: event.target.value })}
          value={body}
          required
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};
