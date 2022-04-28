import React, { useEffect } from 'react';
import {
  changePostId,
  deletePost,
  getPosts,
} from '../../features/post/postSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    selectedPostId,
    isPostsLoading,
  } = useAppSelector(state => state.postReducer);

  const { selectedUserId } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getPosts(selectedUserId));
  }, [selectedUserId]);

  const handleOpenButton = (id: number) => {
    dispatch(changePostId(id));
  };

  const handleDeleteButton = (postId: number) => {
    dispatch(deletePost(postId));
    dispatch(getPosts(selectedUserId));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {isPostsLoading ? (
        <Loader />
      ) : (
        <ul className="PostsList__list">
          {posts.map((post: Post) => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]:`}</b>
                {post.title}
              </div>
              <div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleDeleteButton(post.id)}
                >
                  Delete
                </button>
                {post.id === selectedPostId ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => handleOpenButton(0)}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => handleOpenButton(post.id)}
                  >
                    Open
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
