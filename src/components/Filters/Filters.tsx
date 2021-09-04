import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUserId, setSelectedUserId } from '../../store/postsReducer';
import { getUsersList } from '../../store'

import { User } from '../../types';

export const Filters = () => {
  // const [query, setQuery] = useState('');
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const userId = useSelector(getSelectedUserId);
  const users: User[] = useSelector(getUsersList);

  const dispatch = useDispatch();

  // let newUserId = userId;
  // console.log(newUserId);

  var handleChange = useCallback((value: string) => {
    // const { name, type, checked } = ev.target;
    // let { value }: any = ev.target;
    // newUserId = value;

    if (Number(value) > 0) {
      searchParams.set('userId', value);
      dispatch(setSelectedUserId(Number(value)));
    } else {
      searchParams.delete('userId');
    }
    history.push({ search: searchParams.toString() });
  }, [history, searchParams, dispatch]);

  if (users) {
    return (
      <label>
        Select a user: &nbsp;

        <select
          name="user"
          className="App__user-selector"
          value={userId}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <option value="">
            Choose a user
          </option>
          {users.map((user: any) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
    )
  } else {
    return (
      <div className="App__loading-message">Loading data...</div>
    )
  }
}
