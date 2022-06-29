import React from 'react';
import classNames from 'classnames';
import './PostsList.scss';
import { useDispatch } from 'react-redux';
import { Post } from '../../react-app-env';
import { deletePost, getUserPosts } from '../../helpers/post';
import { setPostsAction } from '../../store/index';

interface Props {
  posts: Post[],
  selectPostId: number,
  onSelectedPostId: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts, selectPostId, onSelectedPostId,
}) => {
  const dispatch = useDispatch();

  const deletePostClick = async (postId: number) => {
    await deletePost(postId);

    const updatePosts = await getUserPosts(0);

    dispatch(setPostsAction(updatePosts));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>

            <div>
              <button
                type="button"
                className={classNames('PostsList__button', 'button', {
                  // eslint-disable-next-line max-len
                  'PostsList__button--active': selectPostId === post.id,
                })}
                onClick={() => (
                  selectPostId === post.id
                    ? onSelectedPostId(0)
                    : onSelectedPostId(post.id))}
              >
                {selectPostId === post.id ? 'Close' : 'Open'}
              </button>

              <button
                type="button"
                className="PostsList__button--delete button"
                onClick={() => deletePostClick(post.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
