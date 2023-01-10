import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentPost } from '../store/posts/postsSelectors';
import { postsAction } from '../store/posts/postsSlice';
import { Post } from '../types/Post';

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector(selectCurrentPost);

  const handleChangePost = () => {
    if (post.id === selectedPost?.id) {
      dispatch(postsAction.changePost(null));
    } else {
      dispatch(postsAction.changePost(post));
    }
  };

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': post.id !== selectedPost?.id,
            },
          )}
          onClick={() => {
            handleChangePost();
          }}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};

export default PostItem;
