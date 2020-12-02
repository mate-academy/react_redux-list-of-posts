import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IPost } from "../../Interfaces";
import cn from "classnames";
import { getActivePostId } from "../../store";
import { updatePostId } from "../../store/posts";

export const PostsListItem: React.FC<{ post: IPost }> = ({ post }) => {
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
        className={cn("PostsList__button button", {
          active: id === activePostId,
        })}
        onClick={onClick}
      >
        {activePostId === id ? "Close" : "Open"}
      </button>
    </>
  );
};
