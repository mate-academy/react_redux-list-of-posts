/* eslint-disable prettier/prettier */
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { setSelectedPost } from './selectedPostSlice';
import { loadComments, clearComments } from './commentsSlice';
import { useAppDispatch } from './hooks';

export const PostList = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((s: RootState) => s.posts);

  const handleClick = (postId: number) => {
    dispatch(setSelectedPost(postId));
    dispatch(clearComments());
    dispatch(loadComments(postId));
  };

  return (
    <ul>
      {items.map(post => (
        <li key={post.id}>
          <button onClick={() => handleClick(post.id)}>
            {post.title}
          </button>
        </li>
      ))}
    </ul>
  );
};
