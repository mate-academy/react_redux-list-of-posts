import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../types";
import classnames from "classnames";
import { getActivePostId } from "../../store";
import { updatePostId } from "../../store/posts";

export const PostsListItem: React.FC<{ post: Post }> = ({ post }) => {
  const activePostId = useSelector(getActivePostId);
  const dispatch = useDispatch();
  const { title, userId, id } = post;

  const onClick = () => {
    if (activePostId === id) {
      dispatch(updatePostId(0));
    } else {
      dispatch(updatePostId(id));
    }
  };

  return (
    <>
      <div>
        <b>{`[User #${userId}]: `}</b>
        {title}
      </div>

      <button
        type="button"
        className={classnames("button", {
          active: id === activePostId,
        })}
        onClick={onClick}
      >
        {activePostId === id ? "Close" : "Open"}
      </button>
    </>
  );
};
