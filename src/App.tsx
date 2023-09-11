import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';

import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { clearPosts, init, setSelectedPost } from './features/posts';

export const App: React.FC = () => {
  const author = useAppSelector((state) => state.author.author);
  const posts = useAppSelector((state) => state.posts.posts);
  const postsIsLoading = useAppSelector((state) => state.posts.loading);
  const postsIsError = useAppSelector((state) => state.posts.isError);
  const selectedPost = useAppSelector((state) => state.posts.selectedPost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(init(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && postsIsLoading && <Loader />}

                {author && !postsIsLoading && postsIsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !postsIsLoading && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!postsIsLoading && posts.length > 0 && (
                  <PostsList posts={posts} selectedPostId={selectedPost?.id} />
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
