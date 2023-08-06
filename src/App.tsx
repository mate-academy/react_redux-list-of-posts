import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/users/authors';
import { fetchPosts, clear } from './features/posts/posts';
import {
  setSelectedPost, clearSelectedPost,
} from './features/posts/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  const author = useAppSelector(state => state.authors);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const handleSetAuthor = (creator: User) => {
    dispatch(setAuthor(creator));
    dispatch(clearSelectedPost());
  };

  const handleSetSelectedPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  useEffect(() => {
    dispatch(clear());

    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleSetAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {author && !loaded && (
                  <Loader />
                )}
                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts && !!posts.length && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSetSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
