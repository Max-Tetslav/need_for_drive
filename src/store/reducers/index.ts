import { combineReducers } from '@reduxjs/toolkit';
import needForDriveApi from '@services/needForDriveAPI';
import breadcrumbReducer from './breadcrumbReducer';
import locationReducer from './locationReducer';
import orderDetailsReduces from './orderDetailsReduces';

const rootReducer = combineReducers({
  location: locationReducer,
  orderDetails: orderDetailsReduces,
  breadcrumb: breadcrumbReducer,
  [needForDriveApi.reducerPath]: needForDriveApi.reducer,
});

export default rootReducer;
