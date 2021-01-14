import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './PostsList.scss';

import { getPostsSelector, setPostId} from '../../store/postsReducer';

export const PostsList = ({selectedPostId}) => {
  const dispatch = useDispatch();
  const postsAll = useSelector(getPostsSelector);


  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsAll.map(post => (
          <li className="PostsList__item" key={post.id} meta-key={post.id}>
            <div>
              <b>
                [User #`$
                {post.userId}
                `]:
                {' '}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(setPostId(post.id));
                }}
              >
                Close
              </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(setPostId(post.id));
                  }}
                >
                  Open
                </button>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

