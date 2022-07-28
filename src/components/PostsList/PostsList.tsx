import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/post';

type Props = {
  posts: Post[],
  selectedPostId: number | null,
  handleSelectedPostId: (postId: number | null) => void,
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  handleSelectedPostId,
}) => {
  const onPostIdChange = (postId: number | null) => {
    if (selectedPostId !== postId) {
      handleSelectedPostId(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul data-cy="postDetails" className="PostsList__list">
        {posts?.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]:`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostIdChange(
                selectedPostId === post.id
                  ? null
                  : post.id,
              )}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
});
