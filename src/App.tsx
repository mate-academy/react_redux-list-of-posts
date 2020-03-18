import React, {
  FC, ChangeEvent, useMemo,
} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { PostList } from './components/PostList';
import { Search } from './components/Search';
import { LoadButton } from './components/LoadButton';
import { LoaderContainer } from './components/LoaderContainer';
import { filterPosts } from './api/filter';
import * as actions from './redux/actions';
import { selectTodosWithUser } from './redux/selectors';

interface Methods {
  setQuery: (value: string) => void;
  loadData: () => void;
}

interface Props {
  isLoading: boolean;
  isLoaded: boolean;
  query: string;
  posts: PreparedPostInterface[];
}

const AppTemplate: FC<Props & Methods> = (props) => {
  const {
    isLoaded,
    isLoading,
    query,
    posts,
    loadData,
    setQuery,
  } = props;

  const handleLoad = async () => {
    loadData();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const postsToShow = useMemo(() => {
    if (!posts.length) {
      return [];
    }

    return filterPosts(query, posts);
  }, [query, posts]);

  return (
    <>
      {isLoaded && <Search query={query} handleSearch={handleSearch} /> }
      {!isLoaded && <LoadButton handleLoad={handleLoad} />}

      {isLoaded && <PostList posts={postsToShow} />}
      {isLoading && <LoaderContainer />}
    </>
  );
};

const mapStateToProps = (
  state: {
    loadReducer: LoadState;
    queryReducer: QueryState;
    dataReducer: DataState;
  },
) => ({
  isLoaded: state.loadReducer.isLoaded,
  isLoading: state.loadReducer.isLoading,
  query: state.queryReducer.query,
  posts: selectTodosWithUser(state.dataReducer),
});

const mapDispatchToProps = {
  loadData: actions.loadData,
  setQuery: actions.setQuery,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTemplate);
