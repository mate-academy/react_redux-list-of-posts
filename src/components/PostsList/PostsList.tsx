import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../../store';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  setIsOpenDetails: (v: boolean) => void;
};

export const PostsList: React.FC<Props> = React.memo(({
  setIsOpenDetails,
}) => {
  const posts = useSelector(selectors.getPosts);
  const isLoad = useSelector(selectors.getIsload);
  const postId = useSelector(selectors.getPostId);
  const dispatch = useDispatch();

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <>
        {posts.length ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(actions.setPostId(
                      postId === post.id ? 0 : post.id,
                    ));
                    setIsOpenDetails(true);
                  }}
                >
                  {postId === post.id ? 'Closed' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {isLoad ? <Loader /> : <h3>User has no posts</h3>}
          </>
        )}
      </>
    </div>
  );
});
