/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Notification from '../../types/Notification';

type AppState = {
  notifications: Notification[];
};

const initialState: AppState = {
  notifications: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    enqueueSnackbar: (state, action:PayloadAction<Notification>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    closeSnackbar:
      (state, action:PayloadAction<{ key:string, dismissAll:boolean }>) => {
        state.notifications = state.notifications.map(
          (noti:Notification) => (
            (action.payload.dismissAll || noti.key === action.payload.key)
              ? { ...noti, dismissed: true }
              : noti),
        );
      },
    removeSnackbar: (state, action:PayloadAction<string>) => {
      state.notifications
        = state.notifications.filter((notification:Notification) => {
          return notification.key !== action.payload;
        });
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
