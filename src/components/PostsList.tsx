import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import PostsAsync from 'store/posts/postsAsync';
import { selectPosts } from 'store/posts/postsSelectors';
import Post from 'models/Post';
import { postsActions } from 'store/posts/postsSlice';
import Loader from './Loader';
import PostItem from './PostItem';

type Props = {
  authorId: number;
};

export const PostsList: React.FC<Props> = ({ authorId }) => {
  const dispatch = useAppDispatch();

  const posts:Post[] | null = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(PostsAsync.fetchPosts(authorId));

    return () => {
      dispatch(postsActions.setInitialField('posts'));
    };
  }, [authorId]);

  if (!posts) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
