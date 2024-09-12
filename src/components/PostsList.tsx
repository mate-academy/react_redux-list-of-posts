import React from 'react';
import { Post } from './Post';
import { Post as PostType } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectedPostSlice } from '../features/selectedPost';

type Props = {
  posts: PostType[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const selectedPostId = selectedPost?.id;

  const handlePostClick = (post: PostType | null) => {
    dispatch(selectedPostSlice.actions.add(post));
  };

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
            <Post
              key={post.id}
              post={post}
              isSelected={post.id === selectedPostId}
              onPostClick={handlePostClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
