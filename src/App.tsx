import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect } from 'react';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './app/Users';
import { fetchPostsByUser, clearPosts } from './app/Posts';
import { setSelectedPost } from './app/selectedPost';

export const App = () => {
  const dispatch = useAppDispatch();

  const { value: author } = useAppSelector(state => state.author);
  const { value: selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    items: allPost,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (!author) {
      dispatch(clearPosts());

      return;
    }

    dispatch(fetchPostsByUser(author.id));
  }, [dispatch, author]);

  const postsExist = allPost.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
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

                {author && loaded && !hasError && !postsExist && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && postsExist && (
                  <div className="block" data-cy="PostsList">
                    <p className="title is-4">Posts:</p>
                    {/* eslint-disable */}
                    <table className="table is-fullwidth is-striped is-hoverable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th className="has-text-right"> </th>
                        </tr>
                      </thead>

                      <tbody>
                        {allPost.map(post => (
                          <tr key={post.id} data-cy="Post">
                            <td
                              className="has-text-weight-bold"
                              data-cy="PostId"
                            >
                              {post.id}
                            </td>
                            <td>{post.title}</td>
                            <td className="has-text-right is-vcentered">
                              <button
                                type="button"
                                className={classNames(
                                  'button',
                                  'is-link',
                                  'is-small',
                                  {
                                    'is-light': selectedPost?.id !== post.id,
                                  },
                                )}
                                data-cy="PostButton"
                                onClick={() =>
                                  dispatch(
                                    setSelectedPost(
                                      selectedPost?.id === post.id
                                        ? null
                                        : post,
                                    ),
                                  )
                                }
                              >
                                {selectedPost?.id === post.id
                                  ? 'Close'
                                  : 'Open'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails chosedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
