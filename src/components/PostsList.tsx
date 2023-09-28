import React from 'react';
import { useAppSelector } from '../app/hooks';
import { PostCard } from './PostCard';

type Props = {
  loadPost: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({ loadPost }) => {
  const { posts } = useAppSelector(state => state.posts);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
  
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
  
        <tbody>
          {posts.map(post => (
            <PostCard
              post={post}
              key={post.id}
              loadPost={loadPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
