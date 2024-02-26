import React, { useCallback, useState } from 'react';

import classNames from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as postsActions } from '../features/posts';

export const PostApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectAuthor = useCallback(
    (autor: User) => {
      setSelectedPost(null);
      setAuthor(autor);
      dispatch(postsActions.loadUserPosts(autor.id));
    },
    [dispatch],
  );

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector value={author} onChange={handleSelectAuthor} />
          </div>

          <div className="block" data-cy="MainContent">
            {!author && <p data-cy="NoSelectedUser">No user selected</p>}

            {author && !loaded && <Loader />}

            {author && loaded && hasError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {author && loaded && !hasError && posts.length === 0 && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}

            {author && loaded && !hasError && posts.length > 0 && (
              <PostsList
                posts={posts}
                selectedPostId={selectedPost?.id}
                onPostSelected={setSelectedPost}
              />
            )}
          </div>
        </div>
      </div>

      <div
        data-cy="Sidebar"
        className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
          'Sidebar--open': selectedPost,
        })}
      >
        <div className="tile is-child box is-success ">
          {selectedPost && <PostDetails post={selectedPost} />}
        </div>
      </div>
    </div>
  );
};
