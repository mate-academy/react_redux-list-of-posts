import React, { useCallback } from 'react';
import './PostsList.scss';
import { Post } from '../../types/post';
import { deletePost } from '../../api/posts';

type Props = {
  posts: Post[],
  selectedPostId: number | null,
  handleSelectedPostId: (postId: number | null) => void,
  reloadPosts: () => void
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  handleSelectedPostId,
  reloadPosts,
}) => {
  const onPostIdChange = (postId: number | null) => {
    if (selectedPostId !== postId) {
      handleSelectedPostId(postId);
    }
  };

  const onPostDeleting = useCallback(async (commentId) => {
    await deletePost(commentId);

    await reloadPosts();
  }, [posts]);

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
            <div className="Posts__buttons">
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

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onPostDeleting(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}

      </ul>
    </div>
  );
});
