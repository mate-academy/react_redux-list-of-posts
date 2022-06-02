import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../api/posts';
import { actions, selectors } from '../../store/main';
import './PostList.scss';

export const PostsList: React.FC = () => {
  const posts = useSelector(selectors.getPostsSelector);
  const selectedPostId = useSelector(selectors.getPostIdSelector);

  const dispatch = useDispatch();

  const handleSelectedPost = useCallback((postId: number) => {
    if (selectedPostId === postId) {
      dispatch(actions.selectPost(null));
    } else {
      dispatch(actions.selectPost(postId));
    }
  }, [selectedPostId]);

  const handleRemovePost = async (postId: number) => {
    await deletePost(postId);

    dispatch(actions.deletePost(postId));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts?.map((post) => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId || 'no user'}]:` }</b>
              {post.title}
            </div>
            <div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleSelectedPost(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
              <button
                type="button"
                className="PostsList__buttonDelete"
                onClick={() => handleRemovePost(post.id)}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
