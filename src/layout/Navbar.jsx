import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { usersContext } from "../context/Store";


export default function Navbar() {
    let { users } = useContext(usersContext);
    let [query, setQuery] = useState("");
    let [focused, setFocused] = useState(false);
    let filteredUsers = users?.filter(user =>
        user?.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(query.toLowerCase()) ||
        user?.midenName?.toLowerCase().includes(query.toLowerCase())
    )
    console.log(users);
    return (
        <nav style={{ position: 'sticky', top: '0', left: '0', zIndex: 10 }} className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid position-relative ">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="row collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className='col-md-1 logo'>
                        <Link className="navbar-brand fw-bolder fs-3" to={'/home'}>
                            Ze
                        </Link>
                    </div>
                    <ul className="col-md-1 navbar-nav mb-lg-0 justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link active" to={'/home'}>
                                <i className="fa-solid fa-house"></i>
                            </Link>

                        </li>
                    </ul>
                    <form className="d-flex align-items-center col-md-9" onSubmit={(e) => e.preventDefault()}>
                        <input className="form-control me-3"
                            type="search"
                            placeholder="Find you friends now . . ."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setFocused(true)}
                            aria-label="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <div className='col-md-1'>

                        <Link to={'/profile'}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </div>
                </div>
                {query && focused && (
                    <div className="searchResult position-absolute top-100 mt-2"
                        style={{
                            width: '97%', color: 'black', background: 'rgb(236, 235, 235)',
                            height: 'auto', borderRadius: '20px', overflow: 'hidden', padding: '20px'
                        }}>
                        {filteredUsers ? (filteredUsers.slice(0, 3).map(user => (
                            <Link
                                key={user.id}
                                to={`/userDetails/${user.id}`}
                                onClick={() => setFocused(false)}
                                className="d-flex justify-content-between align-items-center text-decoration-none text-dark py-1 px-2 hover:bg-light"
                                style={{ background: 'white', marginBottom: '20px', borderRadius: '20px' }}
                            >
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
                                    {user.firstName} {user.lastName}
                                </div>
                                <div>{user.gender}</div>
                            </Link>
                        ))
                        ) : (<div className="text-muted px-2">No users found</div>)}
                    </div>
                )}

            </div>
        </nav >
    )
}