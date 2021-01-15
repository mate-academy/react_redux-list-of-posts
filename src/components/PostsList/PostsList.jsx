import React, {useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './PostsList.scss';
import { Loader } from "../Loader/Loader";
import { getPostsSelector, getUserId, setPostId, setPostsState} from '../../store/postsReducer';



export const PostsList = ({selectedPostId}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const postsAll = useSelector(getPostsSelector);
  const activeUserId = useSelector(getUserId);


  useEffect(() => {
    dispatch(setPostsState(setIsLoading))
  }, [dispatch])

  const postsUserFilter = useMemo(() => {
    let postsAllCopy = [...postsAll];
    if(postsAll.length > 0 && activeUserId) {
      postsAllCopy =  [...postsAll].filter(post => post.userId === activeUserId )
    }

    return postsAllCopy;
  }, [postsAll, activeUserId])

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="PostsList__list">
        {postsUserFilter.map(post => (
          <li className="PostsList__item" key={post.id} meta-key={post.id}>
            <div>
              <b>
                [User #`$
                {post.userId}
                `]:
                {' '}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  dispatch(setPostId(post.id));
                }}
              >
                Close
              </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    dispatch(setPostId(post.id));
                  }}
                >
                  Open
                </button>
              )
            }
          </li>
        ))}
      </ul>
      )}
     
    </div>
  );
}

