import { combineReducers } from '@reduxjs/toolkit';
import needForDriveApi from '@services/location';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  location: locationReducer,
  [needForDriveApi.reducerPath]: needForDriveApi.reducer,
});

export default rootReducer;
