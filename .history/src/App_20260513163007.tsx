import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsAction from './features/post/postSlice';
import { User } from './types/User';
import { setAuthor } from './features/users/usersSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);

  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.users);
  const {
    items: posts,
    loaded,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const handleAuthorChange = (user: User | null) => {
    dispatch(setAuthor(user));
  };

  const handlePostSelect = (post: Post | null) => {
    dispatch(postsAction.setSelectedPost(post));
  };

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(postsAction.setSelectedPost(null));

    if (author) {
      dispatch(postsAction.fetchPosts(author.id))
    } else {
      setPosts([]);
    }
  }, [author]);

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
