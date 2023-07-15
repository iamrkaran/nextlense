import postSlice from '@/reducers/postSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    posts: postSlice,
  },
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
