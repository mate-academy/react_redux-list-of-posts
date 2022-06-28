import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../api/post';
import { setSelectedPostId } from '../../store';
import { getSelectedPostIdSelector } from '../../store/selectors';
import './PostsList.scss';

type Props = {
  posts: Post[],
  onRequestPosts: () => void
};

export const PostsList: React.FC<Props> = ({ posts, onRequestPosts }) => {
  const dispatch = useDispatch();

  const selectedPostId = useSelector(getSelectedPostIdSelector);

  const selectPostId = (postId: number) => {
    dispatch(setSelectedPostId(postId));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <div>
              {post.id !== selectedPostId
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      selectPostId(post.id);
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      selectPostId(0);
                    }}
                    style={{ backgroundColor: 'red' }}
                  >
                    Close
                  </button>
                )}
              <button
                type="button"
                className="button-close"
                onClick={async () => {
                  await deletePost(post.id);
                  onRequestPosts();
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
