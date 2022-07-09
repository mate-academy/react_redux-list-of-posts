import React, { useEffect } from 'react';
import './PostsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../api/posts';
import {
  getCurrentUserSelector,
  getPostsSelector,
  getSelectedPostIdSelector,
} from '../../store/selectors';
import {
  loadAllPosts,
  loadComments,
  setIsLoadingAction,
  setPostsAction,
  setSelectedPostIdAction,
} from '../../store';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const userSelectedId = useSelector(getCurrentUserSelector);
  const postId = useSelector(getSelectedPostIdSelector);
  const currentPostList = useSelector(getPostsSelector);

  const findposts = async () => {
    const result = await getPosts(userSelectedId);

    dispatch(setPostsAction(result));
    dispatch(setIsLoadingAction(false));
  };

  useEffect(() => {
    findposts();
  }, [userSelectedId]);

  useEffect(() => {
    dispatch(loadAllPosts());
  }, []);

  return (
    <div className="PostsList">
      <>
        <h2>Posts:</h2>
        <ul
          className="PostsList__list"
          data-cy="postDetails"
        >
          {currentPostList.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>
                  [User
                  {' '}
                  {post.userId}
                  ]:
                  {' '}
                </b>
                {post.body}
              </div>
              <div className="PostsList__buttonbox">
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    if (postId === post.id) {
                      dispatch(setSelectedPostIdAction(undefined));
                    } else {
                      dispatch(setSelectedPostIdAction(post.id));
                      dispatch(loadComments(post.id));
                    }

                    dispatch(setIsLoadingAction(true));
                  }}
                >
                  {postId === post.id ? 'Close' : 'Open'}
                </button>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={async () => {
                    await deletePost(post.id);
                    dispatch(loadAllPosts());
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};
