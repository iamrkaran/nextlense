import { createAction, createAsyncThunk, createReducer, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/config/axiosInstance';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/config/store';

// Types
type Comment = {
  _id: string;
  postId: string;
  user: string;
  text: string;
  createdDate: Date;
};

type CommentState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

// Initial State
const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Actions
const fetchCommentsStart = createAction('comments/fetchCommentsStart');
const fetchCommentsSuccess = createAction<Comment[]>('comments/fetchCommentsSuccess');
const fetchCommentsFailure = createAction<string>('comments/fetchCommentsFailure');

// Async Thunk Action Creator
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: string, { dispatch }) => {
    try {
      dispatch(fetchCommentsStart());
      const response = await axios.get<Comment[]>(`/comments?postId=${postId}`);
      dispatch(fetchCommentsSuccess(response.data));
    } catch (error:any) {
      dispatch(fetchCommentsFailure(error.message));
    }
  }
);

// Reducer
const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCommentsStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCommentsSuccess, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
    .addCase(fetchCommentsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default commentReducer;
