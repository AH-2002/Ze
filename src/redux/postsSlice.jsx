import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export let fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    let { data } = await axios.get(`${BASE_URL}/posts`);
    return data.posts
})

let postsSlice = createSlice({
    name: "posts",
    initialState: {
        loading: false,
        posts: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.posts = [];
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.posts = [];
            })
    }

})

export default postsSlice.reducer;