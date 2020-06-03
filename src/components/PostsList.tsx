import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import { setQuery } from '../store/search';
import { getSearchQuery } from '../store';
import { debounce } from '../helpers/debounce';

type Props = {
  posts: Post[];
};

const PostsList: React.FC<Props> = ({ posts }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => post.title.toLowerCase().includes(searchQuery)
      || post.body.toLowerCase().includes(searchQuery));
  }, [posts, searchQuery]);

  const handleSearchInput = debounce((value: string) => {
    dispatch(setQuery(value));
  }, 500);

  return (
    <div className="app__posts">
      <input
        className="app__posts-input"
        type="text"
        onChange={(e) => handleSearchInput(e.target.value)}
      />
      {`posts: ${filteredPosts.length}`}
      <ul className="app__posts-list">
        {filteredPosts.map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
