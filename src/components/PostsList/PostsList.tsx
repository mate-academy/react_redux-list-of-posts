import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./PostsList.scss";
import { getPostsSelector, getActiveUserId } from "../../store/index";
import { fetchPosts } from "../../store/posts";
import { IPost } from "../../Interfaces";

import { PostsListItem } from "../PostListItem/PostListItem";

export const PostsList = () => {
  const posts = useSelector(getPostsSelector);
  const activeUserId = useSelector(getActiveUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line
  }, []);

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

      <ul className="PostsList__list">
        {filtredPost.length > 0
          ? filtredPost.map((post: IPost) => (
              <li className="PostsList__item" key={post.id}>
                <PostsListItem post={post} />
              </li>
            ))
          : "no posts"}
      </ul>
    </div>
  );
};
