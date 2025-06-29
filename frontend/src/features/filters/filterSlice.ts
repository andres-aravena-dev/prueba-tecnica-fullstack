import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  status: 'all' | 'completed' | 'pending';
  dueDate?: string; 
}

const initialState: FilterState = {
  status: 'all',
  dueDate: undefined,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<FilterState['status']>) {
      state.status = action.payload;
    },
    setDueDateFilter(state, action: PayloadAction<string | undefined>) {
      state.dueDate = action.payload;
    },
    clearFilters(state) {
      state.status = 'all';
      state.dueDate = undefined;
    },
  },
});

export const { setStatusFilter, setDueDateFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
