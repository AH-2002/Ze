import { useContext } from "react"
import { Link } from "react-router-dom"
import { usersContext } from "../context/Store"


export default function Home() {
    let { users } = useContext(usersContext)
    return (
        <section style={{ background: 'white' }}>
            <div style={{ padding: '20px' }}>
                <h2 style={{ marginBottom: '20px', fontWeight: 'bold' }} >Users</h2>

                {users && users.map((user) => (
                    <Link to={`/userDetails/${user.id}`}>

                        <div style={{background: 'rgb(236, 235, 235)', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div>
                                <img
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    width="50"
                                    height="50"
                                    style={{ borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                                />                        </div>
                            <div>
                                {`${user.firstName} ${user.LastName}`}
                            </div>
                            <div>
                                {user.gender}
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </section>
    )
}