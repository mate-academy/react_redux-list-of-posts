import React, { useCallback, useMemo, useState } from 'react';
import { User } from './User';
import { CommentList } from './CommentList';
import { Search } from './Search';
import debounce from '../helpers/debounce';
import { setQuery } from '../store/query';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/posts';

export const PostsList = ({ posts }: PostsListProps) => {
  const [filteredQuery, setFilteredQuery] = useState('');
  const dispatch = useDispatch();

  const visiblePosts = useMemo(() => {
    const filteredPosts = [...posts].filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filteredQuery.toLowerCase());
    });

    return filteredPosts;
  }, [posts, filteredQuery]);

  const setFilteredQueryWithDebounce = useCallback(
    debounce(setFilteredQuery, 1000),
    [],
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {

    dispatch(setQuery(e.target.value));
    setFilteredQueryWithDebounce(e.target.value);
  }, [setFilteredQueryWithDebounce]);
  return (
    <>
      <Search handleSearch={handleSearch} />
      <article className="app__post-list">
        {visiblePosts.map(({
          id, title, user, body, comments,
        }) => (
          <section className="post" key={id}>
            <h5 className="post__title">{title}</h5>
            <span className="post__delete"
                  onClick={() => dispatch(deletePost(id))}
            >
              Delete post
            </span>
            <p className="post__body">{body}</p>
            <User {...user} />
            <p className="comment__heading">Comments</p>
            <CommentList comments={comments} postId={id}/>
          </section>
        ))}
      </article>
    </>
  );
};
