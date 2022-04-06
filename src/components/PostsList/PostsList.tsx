import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { fetchPosts, removePost } from '../../store/reducers/ActionCreators';
import { postSlice } from '../../store/reducers/PostSlice';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const { selectedUserId } = useAppSelector(state => state.userReducer);
  const {
    posts,
    selectedPostId,
    arePostsLoading,
    errorLoadingPosts,
  } = useAppSelector(state => state.postReducer);
  const dispatch = useAppDispatch();
  const { setSelectedPostId } = postSlice.actions;

  useEffect(() => {
    dispatch(fetchPosts(selectedUserId));
  }, [selectedUserId]);

  const onRemovePost = async (postId: number) => {
    await dispatch(removePost(postId));
    await dispatch(fetchPosts(selectedUserId));
  };

  if (arePostsLoading) {
    return <Loader />;
  }

  if (errorLoadingPosts) {
    return <h2>{errorLoadingPosts}</h2>;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length === 0 ? <h3>No posts of chosen user</h3> : (
          <>
            {posts.map(post => (
              <li key={post.id} className="PostsList__item">
                <div>
                  <b>
                    {`[User #${post.userId}]: `}
                  </b>
                  {post.title}
                </div>
                <div>
                  {
                    selectedPostId === post.id
                      ? (
                        <button
                          onClick={() => dispatch(setSelectedPostId(null))}
                          type="button"
                          className="PostsList__button button"
                        >
                          Close
                        </button>
                      )
                      : (
                        <button
                          onClick={() => dispatch(setSelectedPostId(post.id))}
                          type="button"
                          className="PostsList__button button"
                        >
                          Open
                        </button>
                      )
                  }
                  <button
                    onClick={() => onRemovePost(post.id)}
                    type="button"
                    className="PostsList__button button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};
