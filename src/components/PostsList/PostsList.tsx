import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getPostsFromServer } from '../../store/index';
import { setSelectedPostId } from '../../store/postsListSlice';

import './PostsList.scss';

export const PostsList = () => {
  const {
    selectedUserId,
    selectedPostId,
    posts,
  } = useSelector((state: PostsState) => state.postsListSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsFromServer(selectedUserId));
  }, []);

  const handleOpenPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedPostId(+event.currentTarget.name));
  };

  const getVisiblePosts = () => {
    if (posts.length !== 0) {
      return (
        posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames(
                'PostsList__button',
                'button',
                { 'PostsList__button--opened': selectedPostId === post.id },
              )}
              name={String(post.id)}
              onClick={handleOpenPost}
            >
              Open
            </button>
          </li>
        ))
      );
    }

    return (<span>This user does not have posts yet</span>);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {getVisiblePosts()}
      </ul>
    </div>
  );
};
