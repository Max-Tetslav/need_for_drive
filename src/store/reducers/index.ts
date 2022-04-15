import { combineReducers } from '@reduxjs/toolkit';
import needForDriveApi from '@services/needForDriveAPI';
import orderDetailsReduces from './orderDetailsReduces';

const rootReducer = combineReducers({
  orderDetails: orderDetailsReduces,
  [needForDriveApi.reducerPath]: needForDriveApi.reducer,
});

export default rootReducer;
