import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  current: 0,
};

const userSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateCurrentUser(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
  },
});

export const { updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
