import { useContext } from "react"
import { todosContext } from "../context/Store"

export default function Todo() {
    let { todos } = useContext(todosContext);
    return (
        <section style={{ padding: '20px' }}>
            <h2 style={{marginBottom:'30px'}}>To Do List</h2>
            {todos && todos.map((todo) => (
                <div style={{ background: 'rgb(236, 235, 235)', padding: '10px', borderRadius: '10px',marginBottom:'20px' }}>
                    <p>
                        {todo.todo}
                    </p>
                    <p>
                        Completed? {todo.completed ?
                            (<i style={{ fontSize: 'large', fontWeight: 'bold', color: 'green' }} className="fa-solid fa-check"></i>) :
                            <i style={{ fontSize: 'large', fontWeight: 'bold', color: 'red' }} className="fa-solid fa-xmark"></i>}
                    </p>
                </div >
            ))
            }
        </section >
    )
}