import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPost } from '../features/selectedPost';

type Props = {
  selectedPost: Post | null;
  handleSidebar: (v: boolean) => void;
};

export const PostsList: React.FC<Props> = ({ selectedPost, handleSidebar }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts);

  const onPostSelected = (currentPost: Post | null) => {
    handleSidebar(Boolean(currentPost));

    dispatch(setPost(currentPost));
  };

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
          {posts.items.map(postItem => (
            <tr key={postItem.id} data-cy="Post">
              <td data-cy="PostId">{postItem.id}</td>
              <td data-cy="PostTitle">{postItem.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': postItem.id !== selectedPost?.id,
                  })}
                  onClick={() => {
                    onPostSelected(
                      postItem.id === selectedPost?.id ? null : postItem,
                    );
                  }}
                >
                  {postItem.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
