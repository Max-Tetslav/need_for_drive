import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBreadcrumbItemContent {
  id: number;
  path: string;
  breadcrumbName: string;
  isReady: boolean;
  isCurrent: boolean;
}

interface IBreadcrumbItem {
  point: IBreadcrumbItemContent;
  model: IBreadcrumbItemContent;
  options: IBreadcrumbItemContent;
  total: IBreadcrumbItemContent;
}

export const initialState: IBreadcrumbItem = {
  point: {
    id: 0,
    path: '/order/place',
    breadcrumbName: 'Местоположение',
    isReady: true,
    isCurrent: true,
  },
  model: {
    id: 1,
    path: '/order/model',
    breadcrumbName: 'Модель',
    isReady: false,
    isCurrent: false,
  },
  options: {
    id: 2,
    path: '/order/options',
    breadcrumbName: 'Дополнительно',
    isReady: false,
    isCurrent: false,
  },
  total: {
    id: 3,
    path: '/order/submit',
    breadcrumbName: 'Итого',
    isReady: false,
    isCurrent: false,
  },
};

const breadcrumbSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    completePoint(state, action: PayloadAction<boolean>) {
      state.point.isReady = action.payload;
    },
    completeModel(state, action: PayloadAction<boolean>) {
      state.point.isReady = action.payload;
    },
    completeOptions(state, action: PayloadAction<boolean>) {
      state.point.isReady = action.payload;
    },
    completeTotal(state, action: PayloadAction<boolean>) {
      state.point.isReady = action.payload;
    },
    updateCurrentPoint(state, action: PayloadAction<boolean>) {
      state.point.isCurrent = action.payload;
    },
    updateCurrentModel(state, action: PayloadAction<boolean>) {
      state.point.isCurrent = action.payload;
    },
    updateCurrentOptions(state, action: PayloadAction<boolean>) {
      state.point.isCurrent = action.payload;
    },
    updateCurrentTotal(state, action: PayloadAction<boolean>) {
      state.point.isCurrent = action.payload;
    },
  },
});

export const {
  completePoint,
  completeModel,
  completeOptions,
  completeTotal,
  updateCurrentPoint,
  updateCurrentModel,
  updateCurrentOptions,
  updateCurrentTotal,
} = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
