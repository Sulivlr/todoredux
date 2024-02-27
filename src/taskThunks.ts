import { configureStore, createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://sultan-mukhtarov-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

interface Task {
    id: string;
    title: string;
    status: boolean;
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get(apiUrl);
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (title: string) => {
    const response = await axios.post(apiUrl, {
        title,
        status: false,
    });
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
    await axios.delete(`${apiUrl}/${id}.json`);
    return id;
});

export const clearError = createAction('tasks/clearError');

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.tasks = Object.keys(action.payload).map((key) => ({
                    id: key,
                    ...action.payload[key],
                }));
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push({ id: action.payload.name, title: action.payload.title, status: false });
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(clearError, (state) => {
                state.error = null;
            });
    },
});

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectTasksLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectTasksError = (state: { tasks: TasksState }) => state.tasks.error;

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
    },
});
