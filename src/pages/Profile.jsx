import React, { useEffect, useState } from 'react';

export default function Profile() {
    const [user, setUser] = useState(null);

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        window.location.href = "/"
    }
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <p>Loading user data...</p>;

    return (
        <div className="container mt-4">
            <h2>Profile</h2>
            <div className="card p-3">
                <img src={user.image} alt="User" className="img-thumbnail mb-3" style={{ maxWidth: "150px" }} />
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <div>
                    <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
                </div>
            </div>
        </div>
    );
}
