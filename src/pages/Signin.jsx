import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';

export default function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(''); // Clear previous errors

        try {
            // Make an API call to authenticate the user (mock endpoint)
            const { data, status } = await axios.post(`${BASE_URL}/auth/login`, {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (status === 200) {
                setIsSignedIn(true);
                setError('');
                alert("Sign In Successful!");
                const token = data.accessToken;
                localStorage.setItem("token", token)
                localStorage.setItem("userData", JSON.stringify({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    image: data.image
                }));
                window.location.href = "/home"
            }
        } catch (err) {
            setError('Invalid credentials or something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ marginTop: '100px' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Sign In</h2>
                <p style={{color:'gray'}}>try (emilys) and (emilyspass) to login</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p style={{ marginTop: '15px' }}>
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </section>
    );
}
