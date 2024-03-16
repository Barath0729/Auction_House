import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null); 
    const { name, email, password } = formData;
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/register', formData);
            console.log(res.data);
            navigate('/login');
        } catch (error) {
            console.error(error.response.data);
            setError("User already exists");
        }
    };

    return (
        <div className="div1">
            <h2>Register</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            <button onClick={handleRegister}>Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Register;
