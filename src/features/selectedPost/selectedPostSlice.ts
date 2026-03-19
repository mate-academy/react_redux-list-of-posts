import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = null;

export const { reducer: selectedPostReducer, actions: selectedPostActions } =
  createSlice({
    name: 'selectedPost',
    initialState,
    reducers: {
      setSelectedPost: (_post, action) => action.payload,
    },
  });
