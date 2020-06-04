import React, { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, getQuery } from '../store'
import { Post } from './Post'
import debounce from '../helpers/debounce'
import { setQuery } from '../store/query'

export const PostsList = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const posts = useSelector(getPosts);

  const visiblePosts = useMemo(() => {
    const pattern = new RegExp(query, 'i');

    return posts.filter(({ body, title }: Post) => pattern.test(body + title));
  }, [posts, query]);

  const handleChange = useCallback(
    debounce((value: string) => {
      dispatch(setQuery(value));
    }, 1000),
    [],
  );

  return (
    <>
    <div className="row">
      <div className="input-field col s6 offset-s3">
        <label htmlFor="search">
          Search for posts
          <input
            id="search"
            type="text"
            className="validate"
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
      </div>
    </div>
    <div className="row">
      <div className="posts">
        {visiblePosts.map((currentPost: Post) => (
          <Post {...currentPost} key={currentPost.id} />
        ))}
      </div>
    </div>
  </>
  )
}
