import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PostsList.scss";
import { getPostsSelector, getActiveUserId } from "../../store/index";
import { fetchPosts } from "../../store/postsReducer";
import classNames from "classnames";
import { getActivePostId } from "../../store";
import { updatePostId } from "../../store/postsReducer";
import { Loader } from "../Loader/Loader";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const PostsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector(getPostsSelector);
  const activeUserId = useSelector(getActiveUserId);
  const activePostId = useSelector(getActivePostId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(setIsLoading));
  }, [dispatch]);

  const onClick = (id: number) => {
    if (activePostId === id) {
      dispatch(updatePostId(0));
    } else {
      dispatch(updatePostId(id));
    }
  };

  const filtredPost = useMemo(() => {
    let postsCopy = [...posts];
    if (postsCopy.length > 0 && activeUserId) {
      postsCopy = postsCopy.filter((post) => post.userId === activeUserId);
    }

    return postsCopy;
  }, [posts, activeUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="PostsList__list">
          {filtredPost.length > 0
            ? filtredPost.map((post: Post) => (
                <li className="PostsList__item" key={post.id}>
                  <div>
                    <b>{`[User #${post.userId}]: `}</b>
                    {post.title}
                  </div>

                  <button
                    type="button"
                    className={classNames("PostsList__button button", {
                      active: post.id === activePostId,
                    })}
                    onClick={() => onClick(post.id)}
                  >
                    {activePostId === post.id ? "Hide" : "Open"}
                  </button>
                </li>
              ))
            : "no posts"}
        </ul>
      )}
    </div>
  );
};
