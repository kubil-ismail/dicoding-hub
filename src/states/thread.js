/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../utils/http';

const initialState = {
  selected: null,
  list: null,
  isLoading: false,
};

export const fetchThreadList = createAsyncThunk(
  'thread/fetchList',
  async () => {
    const response = await http.get('/threads');
    return response?.data?.data?.threads ?? [];
  },
);

export const fetchThreadDetail = createAsyncThunk(
  'thread/fetchSelected',
  async (params) => {
    const response = await http.get(`/threads/${params}`);
    return response?.data?.data?.detailThread ?? {};
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSelectedThread: (state, { payload }) => {
      state.selected = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchThreadList.pending, (state) => {
      state.list = [];
      state.isLoading = true;
    });
    builder.addCase(fetchThreadList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchThreadList.rejected, (state) => {
      state.list = [];
      state.isLoading = false;
    });

    builder.addCase(fetchThreadDetail.pending, (state) => {
      state.selected = null;
      state.isLoading = true;
    });
    builder.addCase(fetchThreadDetail.fulfilled, (state, action) => {
      state.selected = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchThreadDetail.rejected, (state) => {
      state.selected = null;
      state.isLoading = false;
    });
  },
});

export const { setSelectedThread } = authSlice.actions;

export default authSlice.reducer;
