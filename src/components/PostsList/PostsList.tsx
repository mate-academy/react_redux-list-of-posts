import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPostIdAction } from '../../store';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId }) => {
  const dispatch = useDispatch();

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`User #${post.userId}:`}</b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                onClick={() => dispatch(selectPostIdAction(0))}
                type="button"
                className="PostsList__button button"
              >
                Close
              </button>
            )
              : (
                <button
                  onClick={() => {
                    dispatch(selectPostIdAction(post.id));
                  }}
                  type="button"
                  className="PostsList__button button"
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
