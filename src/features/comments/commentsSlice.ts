import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../types/Comment";

interface CommentsState {
    loaded: boolean;
    hasError: boolean;
    items: Comment[];
}

interface ActionCommentsReducer {
    payload: CommentsState;
}

const initialState: CommentsState = {
    loaded: false,
    hasError: false,
    items: []
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {
        setComments(state: CommentsState, action: ActionCommentsReducer) {
            state.items = action.payload.items;
        },
        setLoaded(state: CommentsState, action: ActionCommentsReducer) {
            state.loaded = action.payload.loaded;
        },
        setHasError(state: CommentsState, action: ActionCommentsReducer) {
            state.hasError = action.payload.hasError;
        }
    }
})

export const commentsReducer = commentsSlice.reducer;
export const {setComments, setLoaded, setHasError} = commentsSlice.actions;