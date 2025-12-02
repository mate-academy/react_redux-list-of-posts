import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";

interface PostsState {
    loaded?: boolean;
    hasError?: boolean;
    items?: Post[];
}

interface ActionPostsReducer {
    payload: PostsState;
}

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState: {
        items: [],
        hasError: false,
        loaded: false
    },
    reducers: {
        setLoaded(state: PostsState, action: ActionPostsReducer) {
            state.loaded = action.payload.loaded
        },
        setError(state: PostsState, action: ActionPostsReducer) {
            state.hasError = action.payload.hasError;
        },  
        setPosts(state: PostsState, action: ActionPostsReducer) {
            state.items = action.payload.items;
        }
    }
})

export const postsReducer = postsSlice.reducer;

export const {setPosts, setLoaded, setError} = postsSlice.actions;