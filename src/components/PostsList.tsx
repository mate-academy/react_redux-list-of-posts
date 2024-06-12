/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost } from '../features/post/postSlice';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

export const PostsList: FC = () => {
  const { posts, selectedPost } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(setPost(null));
    } else {
      dispatch(setPost(post));
    }
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
            <PostItem
              key={post.id}
              post={post}
              handleSelectPost={handleSelectPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
