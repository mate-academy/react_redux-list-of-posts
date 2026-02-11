import { FC } from 'react';
import { useAppSelector } from '../app/hooks';

interface PostsListProps {
  authorId?: number;
  onSelectPost: (postId: number) => void;
}

export const PostsList: FC<PostsListProps> = ({ authorId, onSelectPost }) => {
  const postsState = useAppSelector(state => state.posts);
  const posts = postsState.items;

  const filteredPosts = authorId
    ? posts.filter(p => p.userId === authorId)
    : posts;

  return (
    <>
      {postsState.hasError && (
        <p style={{ color: 'red' }}>Error loading posts</p>
      )}

      {!postsState.loaded && !postsState.hasError && <p>Loading posts...</p>}

      {postsState.loaded &&
        !postsState.hasError &&
        filteredPosts.length === 0 && <p>No posts available</p>}

      {postsState.loaded &&
        !postsState.hasError &&
        filteredPosts.length > 0 && (
          <ul>
            {filteredPosts.map(post => (
              <li
                key={post.id}
                onClick={() => onSelectPost(post.id)}
                style={{ cursor: 'pointer', marginBottom: '5px' }}
              >
                <strong>{post.title}</strong>
              </li>
            ))}
          </ul>
        )}
    </>
  );
};
