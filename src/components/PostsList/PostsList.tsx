import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PostsList.scss';
import { getPosts } from '../../api/posts';
import { GET_POSTS } from '../../store/postReducer';
import { RootState } from '../../store/index';

type Props = {
  userPosts: number;
  onAdd: (id: number) => void;
  onRemove: () => void;
};

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

export const PostsList: React.FC <Props> = ({ userPosts, onAdd, onRemove }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(postsFromServer => {
        if (userPosts === 0) {
          dispatch({ type: GET_POSTS, payload: postsFromServer });
        } else {
          const thePosts = postsFromServer.filter((post: Post) => {
            return post.userId === userPosts;
          });

          dispatch({ type: GET_POSTS, payload: thePosts });
        }
      });
  }, [userPosts]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts.map(((post: Post) => (
          <li className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button--opened button"
                onClick={() => {
                  setSelectedPostId(0);
                  onRemove();
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onAdd(post.id);
                  setSelectedPostId(post.id);
                }}
              >
                Open
              </button>
            )}
          </li>
        )))}
      </ul>
    </div>
  );
};
