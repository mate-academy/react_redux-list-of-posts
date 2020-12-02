import React, { useEffect, useState } from "react";

import "./PostDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import { NewCommentForm } from "../NewCommentForm/NewCommentForm";
import { getPost, getActivePostId, getComments } from "../../store";
import { fetchPostInfo, removeComment } from "../../store/post";
import { IComment } from "../../Interfaces";
import { Loader } from "../Loader/Loader";

export const PostDetails = () => {
  const post = useSelector(getPost);

  const activePostId = useSelector(getActivePostId);
  const comments = useSelector(getComments);
  const dispatch = useDispatch();
  const [isShownComments, setIsShownComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activePostId) {
      dispatch(fetchPostInfo(activePostId, setIsLoading));
    }
  }, [activePostId, dispatch]);

  const onClick = async (commentId: number, postId: number) => {
    await removeComment(commentId);
    dispatch(fetchPostInfo(postId, setIsLoading));
  };

  return (
    <div className="PostDetails">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {activePostId && post ? (
            <>
              <h2>Post details:</h2>

              <section className="PostDetails__post">
                <p>{post.title}</p>
              </section>

              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={() => setIsShownComments((current) => !current)}
                >
                  {isShownComments ? "Hide comments" : "Show comments"}
                </button>
                {isShownComments && (
                  <ul className="PostDetails__list">
                    {comments.length > 0
                      ? comments.map((item: IComment) => (
                          <li className="PostDetails__list-item" key={item.id}>
                            <button
                              type="button"
                              className="PostDetails__remove-button button"
                              onClick={() => onClick(item.id!, activePostId)}
                            >
                              X
                            </button>
                            <p>{item.body}</p>
                          </li>
                        ))
                      : "No comments"}
                  </ul>
                )}
              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm setIsLoading={setIsLoading} />
                </div>
              </section>
            </>
          ) : (
            <span className="select-post">Select post</span>
          )}
        </>
      )}
    </div>
  );
};
