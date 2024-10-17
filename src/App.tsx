import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppSelector } from './hooks/useAppSelector.hook';
import { useAppDispatch } from './hooks/useAppDispatch.hook';
import { fetchPosts } from './slices/posts.slice';
import { resetCurrentPost, setCurrentPost } from './slices/selectedPost.slice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.author);
  const { post } = useAppSelector(state => state.selectedPost);
  const { items, hasError, loaded } = useAppSelector(state => state.posts);

  const setSelectedPost = (newPost: Post | null) => {
    dispatch(setCurrentPost(newPost));
  };

  useEffect(() => {
    dispatch(resetCurrentPost());

    if (author) {
      dispatch(fetchPosts(author?.id));
    }
  }, [author]);

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

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && items.length > 0 && (
                  <PostsList
                    posts={items}
                    selectedPostId={post?.id}
                    setSelectedPost={setSelectedPost}
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
