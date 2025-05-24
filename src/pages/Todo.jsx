import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/todosSlice";

export default function Todo() {
    let dispatch = useDispatch();
    let { todos, loading, error } = useSelector((state) => state.todos);
    useEffect(() => { dispatch(fetchTodos()) }, [dispatch])
    return (
        <section style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '30px' }}>To Do List</h2>
            {loading ? (<p>Loading</p>) : (todos ? (todos.map((todo) => (
                <div style={{ background: 'rgb(236, 235, 235)', padding: '10px', borderRadius: '10px', marginBottom: '20px' }}>
                    <p>
                        {todo.todo}
                    </p>
                    <p>
                        Completed? {todo.completed ?
                            (<i style={{ fontSize: 'large', fontWeight: 'bold', color: 'green' }} className="fa-solid fa-check"></i>) :
                            <i style={{ fontSize: 'large', fontWeight: 'bold', color: 'red' }} className="fa-solid fa-xmark"></i>}
                    </p>
                </div >
            )
            )) : (<p>Error:{error}</p>))
            }
        </section >
    )
}