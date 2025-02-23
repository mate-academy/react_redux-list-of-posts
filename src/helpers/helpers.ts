/* eslint-disable no-param-reassign */
import { LoadingStatuses } from '../enums/LoadingStatuses';

export const handleItemsLoading = (state, value, loading) => {
  state[value] = LoadingStatuses[loading];
};

export const handleItemsSuccess = (state, value, payload, itemLoading) => {
  state[value] = payload;
  state[itemLoading] = LoadingStatuses.idle;
};
