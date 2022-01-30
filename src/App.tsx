import { useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [searchParams] = useSearchParams() || '';
  const filterQuery = searchParams.get('filterBy') || '';
  const userQuery = searchParams.get('userId') || '';
  const postQuery = searchParams.get('postId') || '';
  const navigate = useNavigate();

  const posts: Post[] = useSelector((state: RootState) => {
    const { postsReducer } = state;

    return postsReducer.posts;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsLoad());
  }, []);

  const filterUserCallback = (post: Post) => {
    if (+userQuery) {
      return post.userId === +userQuery;
    }

    return true;
  };

  const handleInputFilterChange = (e: any) => {
    setInputValue(e.target.value);

    if (e.target.value.trim()) {
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
          value={inputValue}
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
              {posts?.filter(post => (
                filterUserCallback(post)
                && post.title.toLowerCase().includes(filterQuery.toLowerCase())
              )).map(post => (
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

        {postQuery && (
          <PostInfo
            postQuery={postQuery}
            posts={posts}
          />
        )}
      </section>
    </div>
  );
};

export default App;
