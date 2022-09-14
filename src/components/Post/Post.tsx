import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { setCurrentPost } from '../../redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { IPost } from '../../types/Post.interface';

type TProps = {
  post: IPost;
};

export const Post: React.FC<TProps> = ({ post }) => {
  const { currentPost } = useAppSelector(state => state.posts);
  const [isCurrent, setIsCurrent] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsCurrent(post.id === currentPost?.id);
  }, [currentPost]);

  const handleClick = () => {
    const current = isCurrent ? null : post;

    dispatch(setCurrentPost(current));
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            {
              'is-light': !isCurrent,
            },
          )}
          onClick={handleClick}
        >
          {isCurrent ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
