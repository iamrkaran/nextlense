import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/config/axiosInstance';
import { RootState } from '@/config/store';

// Types
type Comment = {
  _id: string;
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

// Slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Async Thunk Action Creator
export const fetchComment = createAsyncThunk<Comment[], string>(
  'comments/fetchComment',
  async (postId, { dispatch }) => {
    try {
      dispatch(commentSlice.actions.fetchCommentStart());
      const response = await axios.get<Comment[]>(`/posts/${postId}/comments`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }
);

export default commentSlice.reducer;
