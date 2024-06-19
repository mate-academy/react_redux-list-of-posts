import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as authorActions from './features/author';
import * as postsActions from './features/posts';
import { User } from './types/User';
import * as selectedPostAction from './features/selectedPost';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.post);

  const handlePostSelect = (value: Post | null) => {
    if (value) {
      dispatch(selectedPostAction.setPost(value));
    } else {
      dispatch(selectedPostAction.removePost());
    }
  };

  const handleChange = (value: User) => {
    dispatch(authorActions.setAuthor(value));
  };

  useEffect(() => {
    dispatch(selectedPostAction.removePost());

    if (author.id) {
      dispatch(postsActions.init(author.id));
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author.id && <p data-cy="NoSelectedUser">No user selected</p>}

                {author.id && !loaded && <Loader />}

                {author.id && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author.id && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author.id && loaded && !hasError && posts.length > 0 && (
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
                'Sidebar--open': selectedPost.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.id ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p> Choose a post </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
