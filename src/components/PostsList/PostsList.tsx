import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PostsList.scss";
import { getPostsSelector, getActiveUserId } from "../../store/index";
import { fetchPosts } from "../../store/posts";
import { IPost } from "../../Interfaces";

import { PostsListItem } from "../PostListItem/PostListItem";
import { Loader } from "../Loader/Loader";

export const PostsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector(getPostsSelector);
  const activeUserId = useSelector(getActiveUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(setIsLoading));
  }, [dispatch]);

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
            ? filtredPost.map((post: IPost) => (
                <li className="PostsList__item" key={post.id}>
                  <PostsListItem post={post} />
                </li>
              ))
            : "no posts"}
        </ul>
      )}
    </div>
  );
};
