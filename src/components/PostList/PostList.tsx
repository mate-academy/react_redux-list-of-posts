import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../api/api';
import { Post } from '../../react-app-env';
import { setPostsAction, setSelectedPostId } from '../../store/actions';
import {
  getPostIdSelector, getPostsSelector, getUserIdSelector,
} from '../../store/selectors';
import './PostList.scss';

export const PostList : React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const currUserId = useSelector(getUserIdSelector);
  const postId = useSelector(getPostIdSelector);

  useEffect(() => {
    const fetcher = async () => {
      const result = await request('/posts');

      if (currUserId === 0) {
        dispatch(setPostsAction(result));
      } else {
        const filteredResult = result.filter(
          (el : Post) => el.userId === currUserId,
        );

        dispatch(setPostsAction(filteredResult));
      }
    };

    fetcher();
  }, [currUserId]);

  return (
    <div className="PostList">
      <ul className="PostList__list">
        {posts.map(el => (
          <li className="PostList__item" key={el.id}>
            <div>
              <b>
                {`User #${el.userId}`}
              </b>
              <button
                type="button"
                className="PostList__button button"
                onClick={() => {
                  if (postId !== el.id) {
                    dispatch(setSelectedPostId(el.id));
                  } else {
                    dispatch(setSelectedPostId(null));
                  }
                }}
              >
                {(postId === el.id) && (
                  <>Close</>
                )}
                {(postId !== el.id) && (
                  <>Open</>
                )}
              </button>
            </div>
            {el.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
