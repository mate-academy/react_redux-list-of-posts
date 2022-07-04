import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../../store';
import { setPostId } from '../../store/postId';
import { actions } from '../../store/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  setIsOpenDetails: (v: boolean) => void;
};

export const PostsList: React.FC<Props> = React.memo(({
  setIsOpenDetails,
}) => {
  const query = useSelector(selectors.getQuery);
  const posts = useSelector(selectors.getPosts);
  const isLoad = useSelector(selectors.getIsload);
  const postId = useSelector(selectors.getPostId);
  const dispatch = useDispatch();

  const filteredPosts = useMemo(() => {
    return !query
      ? posts
      : posts.filter(post => post.body.includes(query));
  }, [posts, query]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <>
        {filteredPosts.length ? (
          <ul className="PostsList__list">
            {filteredPosts.map(post => (
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
                    dispatch(setPostId(
                      postId === post.id ? 0 : post.id,
                    ));
                    setIsOpenDetails(true);
                  }}
                >
                  {postId === post.id ? 'Closed' : 'Open'}
                </button>
                <button
                  type="button"
                  className="PostsList__button button button--is-red"
                  onClick={() => {
                    dispatch(actions.removePost(post.id));
                  }}
                >
                  x
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
