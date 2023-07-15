import { createAction, createReducer, AnyAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import axios from '@/config/axiosInstance';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/config/store';

// Types
type Post = {
  _id: string;
  user: string;
  caption: string;
  image: string;
  createdDate: Date;
  likes: string[];
  comments: { user: string; text: string; createdDate: Date }[];
};

type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

// Initial State
const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Actions
const fetchPostsStart = createAction('posts/fetchPostsStart');
const fetchPostsSuccess = createAction<Post[]>('posts/fetchPostsSuccess');
const fetchPostsFailure = createAction<string>('posts/fetchPostsFailure');

// Reducer
const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPostsStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPostsSuccess, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase(fetchPostsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

// Async Thunk Action Creator
export const fetchPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchPostsStart());
    const response = await axios.get<Post[]>('/posts');
    dispatch(fetchPostsSuccess(response.data));
  } catch (error:any) {
    dispatch(fetchPostsFailure(error.message as string));
  }
};

export default postReducer;
