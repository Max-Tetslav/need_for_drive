import { EOrderItemTypes } from '@models/orderPageData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOrderPointData {
  status: boolean;
  value: {
    city: string;
    address: string;
  };
}

export interface IOrderModelData {
  status: boolean;
  value: {
    id: string;
    model: string;
    maxPrice: number;
    minPrice: number;
  };
}

interface IOrderDetailsInitialState {
  orderStep: {
    current: string;
    next: string;
  };
  point: IOrderPointData;
  model: IOrderModelData;
}

export const initialState: IOrderDetailsInitialState = {
  orderStep: {
    current: EOrderItemTypes.POINT,
    next: EOrderItemTypes.MODEL,
  },
  point: {
    status: false,
    value: {
      city: 'Ульяновск',
      address: '',
    },
  },
  model: {
    status: false,
    value: {
      id: '',
      model: '',
      maxPrice: 0,
      minPrice: 0,
    },
  },
};

const orderDetailsSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updatePointStatus(state, action: PayloadAction<boolean>) {
      state.point.status = action.payload;
    },
    updateCity(state, action: PayloadAction<string>) {
      state.point.value.city = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.point.value.address = action.payload;
    },
    updateModelStatus(state, action: PayloadAction<boolean>) {
      state.model.status = action.payload;
    },
    updateModel(state, action: PayloadAction<string>) {
      state.model.value.model = action.payload;
    },
    updateModelId(state, action: PayloadAction<string>) {
      state.model.value.id = action.payload;
    },
  },
});

export const { updateCity, updateAddress, updateModel, updatePointStatus, updateModelStatus, updateModelId } =
  orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
