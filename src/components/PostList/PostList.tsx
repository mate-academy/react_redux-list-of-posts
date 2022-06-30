import React from 'react';
import './PostList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserPost, selectors, setPostDetails } from '../../redux';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.getPosts);
  const selectedPostId = useSelector(selectors.getSelectedPostId);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 ? (posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            <div>
              {
                selectedPostId !== post.id
                  ? (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        dispatch(setPostDetails(post.id));
                      }}
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        dispatch(setPostDetails(0));
                      }}
                    >
                      Close
                    </button>
                  )
              }
              <button
                type="button"
                className="PostsList__button--delete button"
                onClick={() => dispatch(deleteUserPost(post.id))}
              >
                X
              </button>
            </div>
          </li>
        ))) : 'No posts yet'}

      </ul>
    </div>
  );
};
