import { FC } from 'react';
import { CommentsList } from '../Comments/CommentsList';
import { useAppSelector } from '../../app/hooks';

export const PostDetails: FC = () => {
  const { selectedPost: post } = useAppSelector(state => state.post);

  if (!post) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div
        className="content"
        data-cy="PostDetails"
      >
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          <CommentsList postId={post.id} />
        </div>
      </div>
    </div>
  );
};
