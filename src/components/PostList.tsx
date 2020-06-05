import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, getSortedPosts } from '../store';
import { setSortedPosts } from '../store/sortedPosts';
import Post from './Post';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const sortedPosts = useSelector(getSortedPosts);

  const handlSort = (event: any) => {
    const text = event.target.value;

    dispatch(setSortedPosts(posts, text));
  };

  return (
    <>
      <input
        type="text"
        onChange={handlSort}
        placeholder="Write something"
      />
      <ul>
        {(sortedPosts.length >= 1)
          ? (sortedPosts.map((post: any) => (
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
