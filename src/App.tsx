import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { postsLoad } from './redux/actions';
import { RootState } from './redux/rootReducer';
import { PostList } from './components/PostList/PostList';
import { Post } from './Types/Post';
import { UserSelector } from './components/UserSelector/UserSelector';
import { PostInfo } from './components/PostInfo/PostInfo';
import './App.scss';


const App = () => {
  const [searchParams] = useSearchParams() || '';
  const filterQuery = searchParams.get('filterBy') || '';
  const userQuery = searchParams.get('userId');
  const postQuery = searchParams.get('postId') || '';
  const navigate = useNavigate();

  const posts: Post[] = useSelector((state: RootState) => {
    const { postsReducer } = state;

    return postsReducer.posts;
  });

  const dispatch = useDispatch();
  const selectedPost = posts.find(post => post.id === +postQuery);

  useEffect(() => {
    if (userQuery) {
      dispatch(postsLoad(+userQuery));
    } else {
      dispatch(postsLoad());
    }
  }, [userQuery, dispatch]);

  const getFilteredPosts = useMemo(() => {
    if (filterQuery) {
      return posts.filter(post => post.title.toLowerCase().includes(filterQuery.toLowerCase()));
    }

    return posts;
  }, [posts, filterQuery]);

  const handleInputFilterChange = (e: any) => {
    if (e.target.value.trim().length > 0) {
      searchParams.set('filterBy', e.target.value);
    } else {
      searchParams.delete('filterBy');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className="App">
      <h1 className="App__title">Redux list of posts</h1>
      <div className="App__header">
        <input
          className="App__header-filter"
          type="text"
          placeholder="enter a search term"
          value={filterQuery}
          onChange={handleInputFilterChange}
        />
        <UserSelector
          searchParams={searchParams}
        />
      </div>

      <section className="App__main">
        <div className="App__sidebar">
          <div className="PostList">
            <h2>Posts:</h2>
            <ul className="PostList__list">
              {getFilteredPosts.length > 0
                && getFilteredPosts.map(post => (
                  <PostList
                    key={post.id}
                    post={post}
                    searchParams={searchParams}
                    postQuery={postQuery}
                  />
                ))}
            </ul>
          </div>
        </div>

        {}
        {selectedPost && (
          <PostInfo
            postQuery={postQuery}
            post={selectedPost}
          />
        )}
      </section>
    </div>
  );
};

export default App;
