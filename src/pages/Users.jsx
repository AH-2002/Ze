import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUsers } from "../redux/UsersSlice"

export default function Users() {
    let dispatch = useDispatch();
    let { users, loading, error } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <section style={{ background: 'white' }}>
            <div style={{ padding: '20px' }}>
                <h2 style={{ marginBottom: '20px', fontWeight: 'bold' }} >Users</h2>

                {loading ? (<p>Loading...</p>) : (users ? ((users.map((user) => (
                    <Link to={`/userDetails/${user.id}`} key={user.id}>

                        <div style={{ background: 'rgb(236, 235, 235)', padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div>
                                <img
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    width="50"
                                    height="50"
                                    style={{ borderRadius: "50%", objectFit: "cover", marginRight: "10px" }}
                                />
                            </div>
                            <div>
                                {`${user.firstName} ${user.lastName}`}
                            </div>
                            <div>
                                {user.gender}
                            </div>
                        </div>
                    </Link>


                )))) : (<p>Error: {error}</p>))
                }
            </div>
        </section>
    )
}