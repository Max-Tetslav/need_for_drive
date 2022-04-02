import { configureStore } from '@reduxjs/toolkit';
import needForDriveApi from '@services/location';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './reducers';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(needForDriveApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
