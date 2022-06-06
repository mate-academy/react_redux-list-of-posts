import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayedPosts } from '../../store/displayedPosts';
import { getPosts } from '../../store/selectors';
import { Post } from '../../types/Post';
// import { setUserId } from '../../store/user';

export const Search: React.FC = () => {
  const posts: Post[] = useSelector(getPosts);
  const dispatch = useDispatch();

  const [titleQuery, setTitleQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = debounce(setAppliedQuery, 1000);

  const handleQuery = (query: string) => {
    setTitleQuery(query);
    applyQuery(query);
  };

  useEffect(() => {
    if (posts) {
      const visibleTodos = [...posts].filter((post) => {
        const isQuery = post.title.toLowerCase()
          .includes(appliedQuery.toLowerCase());

        return isQuery;
      });

      dispatch(setDisplayedPosts(visibleTodos));
    }
  }, [appliedQuery, posts]);

  return (
    <label>
      Search:
      <input
        className="App__user-selector"
        type="text"
        value={titleQuery}
        onChange={({ target }) => {
          handleQuery(target.value);
        }}
        data-cy="filterByTitle"
      />
    </label>
  );
};
