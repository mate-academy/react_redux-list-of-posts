import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getPosts,
  getPostId,
  removePost,
  loadComments,
  loadPost,
} from '../../store';
import { setPostId } from '../../store/postId';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts: Posts[] = useSelector(getPosts);
  const postId = useSelector(getPostId);

  const handleClick = (id: number) => {
    dispatch(setPostId(postId === id ? 0 : id));

    if (postId !== id) {
      dispatch(loadComments(id));
      dispatch(loadPost(id));
    }
  };

  const handleDeleteClick = (id: number) => {
    dispatch(removePost(id));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts.length === 0
        ? (
          <div className="App__sidebar--message">
            <p>
              {'This user don\'t have posts yet'}
            </p>
          </div>
        )
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div className="PostsList__post">
                  <b>
                    {`[User #${post.userId}]: `}
                  </b>
                  <b>{post.title}</b>
                  <p>{post.body}</p>
                </div>

                <div className="PostsList__buttons">
                  <button
                    type="button"
                    className={classNames(
                      'PostsList__user-button button',
                      {
                        'PostsList__user-button--selected':
                          postId === post.id,
                      },
                    )}
                    onClick={() => handleClick(post.id)}
                  >
                    {postId === post.id ? 'Close' : 'Open'}
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'PostsList__user-button button',
                      'PostsList__user-button--delete',
                    )}
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};
