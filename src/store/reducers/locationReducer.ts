import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILocationState {
  city: string;
  point: string;
}

export const initialState: ILocationState = {
  city: 'Ульяновск',
  point: '',
};

const locationSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateCurrentCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    updateCurrentPoint(state, action: PayloadAction<string>) {
      state.point = action.payload;
    },
  },
});

export const { updateCurrentCity, updateCurrentPoint } = locationSlice.actions;
export default locationSlice.reducer;
