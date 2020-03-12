import React, { FC, ChangeEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { InitialState } from '../../constants/types';
import { RootDispatcher } from '../../store/root-reducer';

const DEBOUNCE_TIMEOUT = 1000;

interface StateProps {
  inputValue: string;
}


export const Search: FC = () => {
  const { inputValue } = useSelector<InitialState, StateProps>((state: InitialState) => ({
    inputValue: state.inputValue,
  }));

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const setFilterValueWithDebounce = useCallback(
    debounce(rootDispatcher.setFilterValue, DEBOUNCE_TIMEOUT),
    [],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    rootDispatcher.setInputValue(event.target.value);
    setFilterValueWithDebounce(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter posts"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
