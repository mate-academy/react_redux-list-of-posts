import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import {
  filterVisiblePostsAction,
} from '../../store/PostsReducer/actions';

import {
  getPostsSelector,
  getPostsTitleQuerySelector,
  getSelectValueSelector,
} from '../../store/PostsReducer/selectors';
import { loadUserAction } from '../../store/UserReducer/actions';

import './PostListControlPanel.scss';
import { addComments, addPosts, addUsers } from '../../api/fixApi';
import { Post } from '../../types/Post';

export const PostListControlPanel: FC = memo(() => {
  const dispatch = useDispatch();

  const selectValue = useSelector(getSelectValueSelector);
  const titleQuery = useSelector(getPostsTitleQuerySelector);
  const AllPosts = useSelector(getPostsSelector);

  const [currentFilterInput, setCurrentInputFilter] = useState(titleQuery);

  const applyQuery = useCallback(
    debounce((query, posts) => {
      dispatch(filterVisiblePostsAction(query, posts));
    }, 500),
    [titleQuery],
  );

  const handleQueryChange = useCallback((value: string, posts: Post[]) => {
    setCurrentInputFilter(value);
    applyQuery(value, posts);
  }, [titleQuery]);

  useEffect(() => {
    handleQueryChange(titleQuery, AllPosts);
  }, [AllPosts]);

  return (
    <div className="control-panel">
      <label className="control-panel__label">
        Select a user:

        <select
          className="control-panel__select"
          value={selectValue}
          onChange={({ target }) => {
            dispatch(loadUserAction(target.value));
          }}
        >
          <option value="All users">
            All users
          </option>

          <option value="Leanne Graham">
            Leanne Graham
          </option>

          <option value="Ervin Howell">
            Ervin Howell
          </option>

          <option value="Clementine Bauch">
            Clementine Bauch
          </option>

          <option value="Patricia Lebsack">
            Patricia Lebsack
          </option>

          <option value="Chelsey Dietrich">
            Chelsey Dietrich
          </option>

          <option value="Mrs. Dennis Schulist">
            Mrs. Dennis Schulist
          </option>

          <option value="Kurtis Weissnat">
            Kurtis Weissnat
          </option>

          <option value="Nicholas Runolfsdottir V">
            Nicholas Runolfsdottir V
          </option>

          <option value="Glenna Reichert">
            Glenna Reichert
          </option>
        </select>
      </label>

      <label className="control-panel__label">
        Filter:

        <input
          type="text"
          className="control-panel__input"
          value={currentFilterInput}
          onChange={({ target }) => {
            handleQueryChange(target.value, AllPosts);
          }}
        />
      </label>

      <button
        type="button"
        className="button НЕ__БЛАГОДАРИТЕ"
        onClick={async () => {
          Promise.all([
            addPosts(),
            addUsers(),
            addComments(),
          ]);
          window.location.reload();
        }}
      >
        FIX API
      </button>
    </div>
  );
});
