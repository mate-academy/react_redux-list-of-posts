import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { setAuthor, selectAuthor } from './features/authorSlice';
import { User } from './types/User';
import { fetchPosts, selectPostsState } from './features/postsSlice';
import {
  selectSelectedPost,
  setSelectPost,
} from './features/selectedPostSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);
  const { items: posts, loaded, hasError } = useAppSelector(selectPostsState);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  const handleAuthorChange = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(setSelectPost(null));
  };

  const handlePostSelect = (post: Post | null) => {
    dispatch(setSelectPost(post));
  };

  useEffect(() => {
    if (!author) {
      return;
    }

    dispatch(fetchPosts(author.id));
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
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
                    onPostSelected={handlePostSelect}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
