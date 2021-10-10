import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PostsList.scss';
import { setPosts, setUserPosts } from '../../store/changePosts';
import { setSelectPost } from '../../store/selectPost';
import { closePostDetails, setPostDetails } from '../../store/showPostDetails';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector(({ changePosts }: any) => changePosts);
  const { selectedUser } = useSelector(({ selectUser }: any) => selectUser);
  const { selectedPost } = useSelector(({ selectPost }: any) => selectPost);

  const handleSetSelectedPostId = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    postId = null,
  ) => {
    event.preventDefault();

    dispatch(setSelectPost(postId));
  };

  useEffect(() => {
    if (selectedUser === '0') {
      dispatch(setPosts());
    } else {
      dispatch(setUserPosts(selectedUser));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      dispatch(setPostDetails(`${selectedPost}`));
    } else {
      dispatch(closePostDetails());
    }
  }, [selectedPost]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(({ id, userId, title }: any) => (
          <li
            key={id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {userId}
                ]:
              </b>
              {title}
            </div>
            {selectedPost === id
              ? (
                <button
                  type="button"
                  className="PostsList__button button active"
                  onClick={handleSetSelectedPostId}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={(event) => handleSetSelectedPostId(event, id)}
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
