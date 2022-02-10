import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { deletePost } from '../../store/reducers/postReducer';
import { PostActionTypes } from '../../store/types/post';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const { posts, isLoadingPosts, selectedPostId } = useTypedSelector(state => state.post);
  const dispatch = useDispatch();

  const handleClickPost = (postId: number) => {
    if (selectedPostId === postId) {
      dispatch({ type: PostActionTypes.CHANGE_POSTID, payload: 0 });
    } else {
      dispatch({ type: PostActionTypes.CHANGE_POSTID, payload: postId });
    }
  };

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  if (isLoadingPosts) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <button
                type="button"
                onClick={() => handleDeletePost(post.id)}
              >
                X
              </button>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClickPost(post.id)}
              >
                { selectedPostId === post.id
                  ? 'Close'
                  : 'Open' }
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
