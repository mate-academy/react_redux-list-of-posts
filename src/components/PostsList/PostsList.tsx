import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePost } from '../../redux/actions/posts';
import { RootState } from '../../redux/store';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.postsList);
  const activePostId = useSelector((state: RootState) => (
    state.posts.activePost
  ));

  const openPost = (postId: number | null) => {
    dispatch(setActivePost(postId));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.length > 0 && posts.map((post) => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.id}]: `}</b>
              {post.title}
            </div>
            {post.id === activePostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(post.id);
                }}
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
