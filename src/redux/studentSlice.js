import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('/students.json');
  return response.data;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: { list: [], status: 'idle', error:null },
  reducers: {
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        console.log('Fetched students:', action.payload);
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Error fetching students:', action.error.message);
      });
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
