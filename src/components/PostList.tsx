import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getfilteredPosts } from '../store';
import { setFilteredPosts } from '../store/filteredPosts';
import Post from './Post';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const filteredPosts = useSelector(getfilteredPosts);

  const handlSort = (event: any) => {
    const text = event.target.value;

    dispatch(setFilteredPosts(posts, text));
  };

  return (
    <>
      <input
        type="text"
        onChange={handlSort}
        placeholder="Write something"
      />
      <ul>
        {(filteredPosts.length >= 1)
          ? (filteredPosts.map((post: any) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          )))
          : (posts.map((post: any) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          )))}
      </ul>
    </>

  );
};

export default PostList;
