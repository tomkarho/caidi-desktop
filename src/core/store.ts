import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import counter from '../features/counter/counterSlice';
import settings from '../features/settings/settingsSlice';

const reducer = combineReducers({counter, settings});
export const store = configureStore({reducer});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
