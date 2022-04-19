import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar, IPoint, IRate } from '@models/orderPageData';
import initialState from '@utils/constants/store';

const orderDetailsSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateCity(state, action: PayloadAction<string>) {
      state.point.cityId.name = action.payload;
    },
    updateAddress(state, action: PayloadAction<string>) {
      state.point.address = action.payload;
    },
    updatePoint(state, action: PayloadAction<IPoint>) {
      state.point = action.payload;
    },
    updateModel(state, action: PayloadAction<ICar>) {
      state.model = action.payload;
    },
    updateColor(state, action: PayloadAction<string>) {
      state.options.color = action.payload;
    },
    updateColorId(state, action: PayloadAction<string>) {
      state.options.colorId = action.payload;
    },
    updateRate(state, action: PayloadAction<IRate>) {
      state.options.rate = action.payload;
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
    updateFinalPrice(state, action: PayloadAction<number>) {
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
    updateIsModalShown(state, action: PayloadAction<boolean>) {
      state.total.isModalShown = action.payload;
    },
    clearOrderData() {
      return initialState;
    },
  },
});

export const {
  updateCity,
  updateAddress,
  updateModel,
  updatePoint,
  updateColor,
  updateColorId,
  updateRateName,
  updateRateId,
  updateRatePrice,
  updateRate,
  updateDateFrom,
  updateDateTo,
  updateDuration,
  updateFinalPrice,
  updateIsFullTank,
  updateIsNeedChildChair,
  updateIsRightWheel,
  updateIsModalShown,
  clearOrderData,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
