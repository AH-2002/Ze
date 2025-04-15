import axios from "axios";
import { createContext, useEffect, useState } from "react";
import BASE_URL from "../config";

export let usersContext = createContext(0);
export let todosContext = createContext(0);
export let postsContext = createContext(0);

export function PostsContextProvider(props) {
    let [posts, setPosts] = useState([]);
    async function GetPosts() {
        try {
            let { data } = await axios.get(`${BASE_URL}/posts`);
            setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    }
    useEffect(() => { GetPosts() }, [])
    return <postsContext.Provider value={{ posts, setPosts }}>
        {props.children}
    </postsContext.Provider>
}

export function TodosContextProvider(props) {
    let [todos, setTodos] = useState([]);
    async function getTodos() {
        try {
            let { data } = await axios.get(`${BASE_URL}/todos`)
            setTodos(data.todos)
        } catch (error) {
            console.error("Error fetching users", error)
        }
    }
    useEffect(() => { getTodos(); }, [])
    return <todosContext.Provider value={{ todos }}>
        {props.children}
    </todosContext.Provider>
}

export function UsersContextProvider(props) {
    let [users, setUsers] = useState([]);
    async function getUsers() {
        try {
            let { data } = await axios.get(`${BASE_URL}/users`)
            setUsers(data.users)

        } catch (error) {
            console.error("Error fetching users", error)
        }
    }
    useEffect(() => {
        getUsers();
    }, []);
    return <usersContext.Provider value={{ users }}>
        {props.children}
    </usersContext.Provider>
}
