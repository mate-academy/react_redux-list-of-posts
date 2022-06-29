import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../helpers/post';
import { getPostsAction } from '../../store';
import { setPostsSelector } from '../../store/selectors';
import './PostsList.scss';

type Props = {
  userSelect: string;
  setPostId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({
  userSelect,
  setPostId,
}) => {
  const dispatch = useDispatch();
  const posts = useSelector(setPostsSelector);

  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    getUserPosts(userSelect)
      .then(post => dispatch(getPostsAction(post)));
  }, [userSelect]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
            data-cy="postDetails"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (post.id === selectedPostId) {
                  setSelectedPostId(0);
                  setPostId(0);
                } else {
                  setSelectedPostId(post.id);
                  setPostId(post.id);
                }
              }}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
