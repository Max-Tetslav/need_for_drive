import { EOrderItemTypes } from '@models/orderPageData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOrderPointData {
  status: boolean;
  value: {
    city: string;
    cityId: string;
    address: string;
    addressId: string;
  };
}

export interface IOrderModelData {
  status: boolean;
  value: {
    id: string;
    model: string;
    maxPrice: number;
    minPrice: number;
    colors: string[];
  };
}

export interface IOrderOptionsData {
  color: string;
  rateName: string;
  rateId: string;
  ratePrice: number;
  dateFrom: number;
  dateTo: number;
  duration: string;
  finalPrice: string;
  isFullTank: boolean | null;
  isNeedChildChair: boolean | null;
  isRightWheel: boolean | null;
}

interface IOrderDetailsInitialState {
  orderStep: {
    current: string;
    next: string;
  };
  point: IOrderPointData;
  model: IOrderModelData;
  options: IOrderOptionsData;
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
      cityId: '',
      address: '',
      addressId: '',
    },
  },
  model: {
    status: false,
    value: {
      id: '',
      model: '',
      maxPrice: 0,
      minPrice: 0,
      colors: [],
    },
  },
  options: {
    color: '',
    rateName: '',
    rateId: '',
    ratePrice: 0,
    dateFrom: 0,
    dateTo: 0,
    duration: '',
    finalPrice: '',
    isFullTank: null,
    isNeedChildChair: null,
    isRightWheel: null,
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
    updateModelMaxPrice(state, action: PayloadAction<number>) {
      state.model.value.maxPrice = action.payload;
    },
    updateModelMinPrice(state, action: PayloadAction<number>) {
      state.model.value.minPrice = action.payload;
    },
    updateModelColorsList(state, action: PayloadAction<string[]>) {
      state.model.value.colors = action.payload;
    },
    updateColor(state, action: PayloadAction<string>) {
      state.options.color = action.payload;
    },
    updateRateName(state, action: PayloadAction<string>) {
      state.options.rateName = action.payload;
    },
    updateRateId(state, action: PayloadAction<string>) {
      state.options.rateId = action.payload;
    },
    updateRatePrice(state, action: PayloadAction<number>) {
      state.options.ratePrice = action.payload;
    },
    updateDateFrom(state, action: PayloadAction<number>) {
      state.options.dateFrom = action.payload;
    },
    updateDateTo(state, action: PayloadAction<number>) {
      state.options.dateTo = action.payload;
    },
    updateDuration(state, action: PayloadAction<string>) {
      state.options.duration = action.payload;
    },
    updateFinalPrice(state, action: PayloadAction<string>) {
      state.options.finalPrice = action.payload;
    },
    updateIsFullTank(state, action: PayloadAction<boolean>) {
      state.options.isFullTank = action.payload;
    },
    updateIsNeedChildChair(state, action: PayloadAction<boolean>) {
      state.options.isNeedChildChair = action.payload;
    },
    updateIsRightWheel(state, action: PayloadAction<boolean>) {
      state.options.isRightWheel = action.payload;
    },
  },
});

export const {
  updateCity,
  updateAddress,
  updateModel,
  updatePointStatus,
  updateModelStatus,
  updateModelId,
  updateModelMaxPrice,
  updateModelMinPrice,
  updateModelColorsList,
  updateColor,
  updateRateName,
  updateRateId,
  updateRatePrice,
  updateDateFrom,
  updateDateTo,
  updateDuration,
  updateFinalPrice,
  updateIsFullTank,
  updateIsNeedChildChair,
  updateIsRightWheel,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
