import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export let fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    let { data } = await axios.get(`${BASE_URL}/todos`);
    return data.todos;
})

let todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.todos = [];
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default todosSlice.reducer;