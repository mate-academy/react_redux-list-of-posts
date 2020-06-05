import React, { useState, useEffect } from 'react';
import { matchedPosts } from '../helpers/matchedPosts';
import { useDebounce } from 'use-debounce';
import { SearchForm } from './SearchForm';
import { useSelector } from 'react-redux';
import { getPosts } from '../store';
import { Post } from './Post';


const PostList: React.FC = () => {
  const posts = useSelector(getPosts);
  const [inputValue, setInputValue] = useState<string>('');
  const [visiblePosts, setVisiblePosts] = useState<DataPost[]>([]);
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }  = e.target;
    setInputValue(value);
  };

  useEffect(() => {

    if (debouncedInputValue) {
        console.log(debouncedInputValue[0])
      const result = matchedPosts(posts, debouncedInputValue[0]);
      setVisiblePosts(result);
      }
    }, [debouncedInputValue[0], posts]);

  return (
    <>
      <div className="search_block">
      <SearchForm
          handleChangeInput={handleChangeInput}
          inputValue={inputValue}
        />
        <div className="posts_count">
          {visiblePosts.length}
          {' '}
          post(s) are found
        </div>
      </div>
      <ul>
        {visiblePosts.map(post => (
          <Post
            post={post}
            key={post.id}
          />
        ))}
      </ul>
    </>
  );
};

export default PostList;
