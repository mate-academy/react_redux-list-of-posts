import React, { useEffect } from 'react';
import './PostsList.scss';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../api/posts';
import { changePostAction, loadPostsAction } from '../../store/actions';

type Props = {
  postId: number,
  posts: Post[],
  userId: number,
};

export const PostsList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { postId, posts, userId } = props;

  useEffect(() => {
    const loadPostsFromServer = async () => {
      const postsFromServer = await getPosts(userId);

      dispatch(loadPostsAction(postsFromServer));
    };

    loadPostsFromServer();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {postId !== post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => dispatch(changePostAction(post.id))}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => dispatch(changePostAction(0))}
                >
                  Close
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
