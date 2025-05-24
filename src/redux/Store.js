import { configureStore } from '@reduxjs/toolkit';
import UsersSlice from "./UsersSlice";
import todosSlice from "./todosSlice";
import postsSlice from './postsSlice';

export const store = configureStore({
    reducer: {
        users: UsersSlice,
        todos: todosSlice,
        posts: postsSlice,
    },
})