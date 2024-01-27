import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as AuthorActions from './features/author/authorSlice';
import * as PostsActions from './features/posts/postsSlice';
import * as SelectedPostActions
  from './features/selectedPost/selectedPostSlice';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const setAuthor = (user: User) => {
    dispatch(AuthorActions.setAuthor(user));
  };

  const setSelectedPost = useCallback((post: Post | null) => {
    dispatch(SelectedPostActions.setSelectedPost(post));
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      dispatch(PostsActions.init(author.id));
    } else {
      dispatch(PostsActions.init(null));
    }
  }, [author, dispatch, setSelectedPost]);

  useEffect(() => {
    if (author) {
      dispatch(PostsActions.init(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
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
