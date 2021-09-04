import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './PostsList.scss';

import {
  getPostsList,
  getSelectedPostId,
} from '../../store';
import { fetchPosts, setPostId } from '../../store/postsReducer';

import { Post } from '../../types';
import { setPostComments } from '../../store/commentsReducer';

// interface PostsListProps {
//   userid: number;
// }

// export const PostsList: React.FC<PostsListProps> = ({
//   userid
// }) => {
export const PostsList = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const posts: Post[] = useSelector(getPostsList);
  const postId = useSelector(getSelectedPostId);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedUserId = Number(searchParams.get('userId')) || 0;

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUserId > 0) {
      console.log('userId and selectedUserId in useEffect 1', selectedUserId);
      dispatch(fetchPosts(selectedUserId));
    } else {
      console.log('userId and selectedUserId in useEffect 2', selectedUserId);
      dispatch(fetchPosts());
    }
  }, [selectedUserId, dispatch]);

  // useEffect(() => {
  //   if (postId > 0) {
  //     fetchPost(postId);
  //   }
  // }, [postId]);

  // console.log(posts, typeof posts != "undefined" && posts != null && posts.length != null);
  const isPostListEmpty = posts ? (posts.length ? false : true) : true;

  return (
    <div className="PostsList">
      {isPostListEmpty ? (
        <p className="info">Posts list is empty.</p>
      ) : (
        <>
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {posts.map((post: any) => (
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>
                    [User
                    {post.title}
                    ]:
                    {' '}
                  </b>
                  {post.body}
                </div>
                  {postId !== post.id ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      dispatch(setPostId(post.id))
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button button--active"
                    onClick={() => {
                      dispatch(setPostId(0));
                      dispatch(setPostComments(null));
                    }}
                  >
                    Close
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
