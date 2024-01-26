/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../utils/http';

const initialState = {
  profile: null,
  users: [],
};

export const fetchUserList = createAsyncThunk(
  'auth/fetchUserList',
  async () => {
    const response = await http.get('/users');
    return response?.data?.data?.users ?? [];
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserList.pending, (state) => {
      state.users = [];
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUserList.rejected, (state) => {
      state.users = [];
    });
  },
});

export const { setProfile } = authSlice.actions;

export default authSlice.reducer;
