// src/app/store.ts (Atualizado)

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice'; // NOVO: Importe o reducer de comentários

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    // ADICIONADO: O Slice de Comments
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
