
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getAllData } from '../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { PostType } from '../types';
import { debounce } from '../helpers/debounce';
import { filterFieldChange } from '../store/filterField';
import { RootState, loadingFinish } from '../store';
import { Post } from './Post';
import { setMessage } from '../store/message';

const PostList = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.message);
  const filteredPosts = useSelector((state: RootState) => state.filteredPosts);
  const posts = useSelector((state:RootState) => state.posts);
  const [filterFieldValue, setFilterFieldValue] = useState('')

  const handleButtonClick = () => {
    dispatch(setMessage('Loading....'))
    getAllData().then(([posts, users, comments]) => {
      const message = 'Loaded';
    dispatch(loadingFinish({posts, users, comments, message}))
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterFieldValue(event.target.value);
  }

  useEffect(() => {
    debounce(() => {
         dispatch(filterFieldChange(filterFieldValue, posts));
     },
      1000)
  }, [filterFieldValue, dispatch, posts])

  return (
    <div>
      {filteredPosts.length !== 0
        ? (<>
          <span>For filtering: </span>
          <input
            type="text"
            value={filterFieldValue}
            onChange={handleInputChange}
          />
          <ul>
            {filteredPosts.map((post: PostType) => {
              return (
                <li key={post.id}>
                  <Post id={post.id} />
                </li>
              )
            })}
          </ul>
        </>)
        : <button
          onClick={handleButtonClick}
        >
          {message}
        </button>}
    </div>
  )
}

export default PostList;
