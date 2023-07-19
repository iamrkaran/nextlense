import postSlice from '@/reducers/postSlice';
import commentSlice from '@/reducers/commentSlice';
import chatSlice from '@/reducers/chatSlice';
import { AnyAction, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    posts: postSlice,
    comments:commentSlice,
    chat:chatSlice,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type ThunkAppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
