/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setSelectedPostId } from '../../store';
import { getAllPosts, getUserPosts, deletePostById } from '../../api/posts';
import './PostsList.scss';
import {
  getPostsSelector,
  getSelectedUserIdSelector,
  getSelectedPostIdSelector,
} from '../../store/selectors';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);
  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const selectedPostId = useSelector(getSelectedPostIdSelector);

  const loadPostsFromServer = async () => {
    try {
      const postsFromServer = selectedUserId === 0
        ? await getAllPosts()
        : await getUserPosts(selectedUserId);

      dispatch(setPosts(postsFromServer));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPostsFromServer();
  }, [selectedUserId]);

  const deletePost = async (todoId: number) => {
    try {
      await deletePostById(todoId);
      await loadPostsFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        data-cy="postDetails"
        className="PostsList__list"
      >
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <div>
              {selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedPostId(0));
                    }}
                    className="PostsList__button button button-active"
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedPostId(post.id));
                    }}
                    className="PostsList__button button"
                  >
                    Open
                  </button>
                ) }
              <button
                type="button"
                onClick={() => (
                  deletePost(post.id)
                )}
                className="PostsList__button-delete button"
              >
                Delete
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};
