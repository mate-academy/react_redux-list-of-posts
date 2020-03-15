import React, { FC, ChangeEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import {
  setFilterValue,
  setInputValue,
} from '../../store/actions';
import { InitialState } from '../../constants/types';

const DEBOUNCE_TIMEOUT = 1000;

interface StateProps {
  inputValue: string;
}


export const Search: FC = () => {
  const { inputValue } = useSelector<InitialState, StateProps>((state: InitialState) => ({
    inputValue: state.inputValue,
  }));

  const dispatch = useDispatch();
  const dispatchWithDebounce = useCallback(
    debounce(dispatch, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
    dispatchWithDebounce(setFilterValue(event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Filter posts"
        onChange={handleInputChange}
      />
    </div>
  );
};
