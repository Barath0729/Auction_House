
// Login.js

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'Barath' && password === '123456') {
      navigate('/details');
    } else {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className="div1" >
      <center>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={handleLogin}
        style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </center>
    </div>
  );
};

export default Login;*/


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); 
    const { email, password } = formData;
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/login', formData);
            console.log(res.data);
            navigate('/details');
        } catch (error) {
            console.error(error.response.data);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="div1">
            <center>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button
                    onClick={handleLogin}
                    style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Login
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </center>
        </div>
    );
};

export default Login;