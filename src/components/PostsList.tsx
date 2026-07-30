import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  setSelectedPost,
  clearSelectedPost,
} from '../features/selectedPost/selectedPostSlice';

import { Post } from './Post';

export const PostsList = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.items);

  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const handleSelect = (post: (typeof posts)[number]) => {
    if (selectedPost?.id === post.id) {
      dispatch(clearSelectedPost());
    } else {
      dispatch(setSelectedPost(post));
    }
  };

  return (
    <div data-cy="PostsList">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          selectedPost={selectedPost}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
