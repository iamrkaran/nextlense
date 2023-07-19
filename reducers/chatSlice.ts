import { createAction, createReducer, AnyAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import axios from '@/config/axiosInstance';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/config/store';

// Types
type ChatMessage = {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
};

type ChatState = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
};

// Initial State
const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

// Actions
const fetchChatMessagesStart = createAction('chat/fetchChatMessagesStart');
const fetchChatMessagesSuccess = createAction<ChatMessage[]>('chat/fetchChatMessagesSuccess');
const fetchChatMessagesFailure = createAction<string>('chat/fetchChatMessagesFailure');

// Reducer
const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchChatMessagesStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchChatMessagesSuccess, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    })
    .addCase(fetchChatMessagesFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}); 

// Async Thunk Action Creator
export const fetchChatMessages = (sender: string, receiver: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchChatMessagesStart());
    const response = await axios.get<ChatMessage[]>(`/chat/fetch?sender=${sender}&receiver=${receiver}`);
    dispatch(fetchChatMessagesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchChatMessagesFailure(error.message as string));
  }
};

export default chatReducer;
