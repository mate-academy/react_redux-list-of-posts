import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';
import { User } from '../types/User';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as postsActions } from '../features/posts';

export const PostApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoaded, hasError } = useAppSelector(state => state.posts);

  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      dispatch(postsActions.loadUserPosts(author.id));
    } else {
      dispatch(postsActions.clearPosts());
    }
  }, [dispatch, author]);

  return (
    <div className="tile is-ancestor">
      <div className="tile is-parent">
        <div className="tile is-child box is-success">
          <div className="block">
            <UserSelector value={author} onChange={setAuthor} />
          </div>

          <div className="block" data-cy="MainContent">
            {!author && <p data-cy="NoSelectedUser">No user selected</p>}

            {author && !isLoaded && <Loader />}

            {author && isLoaded && hasError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                Something went wrong!
              </div>
            )}

            {author && isLoaded && !hasError && posts.length === 0 && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}

            {author && isLoaded && !hasError && posts.length > 0 && (
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
        className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
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
