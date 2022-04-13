import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar, IPoint } from '@models/orderPageData';
import initialState from '@utils/constants/store';

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
    updatePoint(state, action: PayloadAction<IPoint>) {
      state.point.orderData = action.payload;
    },
    updateModelStatus(state, action: PayloadAction<boolean>) {
      state.model.status = action.payload;
    },
    updateModel(state, action: PayloadAction<ICar>) {
      state.model.value = action.payload;
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
  },
});

export const {
  updateCity,
  updateAddress,
  updateModel,
  updatePointStatus,
  updatePoint,
  updateModelStatus,
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
  updateIsModalShown,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
