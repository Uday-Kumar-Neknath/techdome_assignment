import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Correct the conditional structure here
        if (/* some condition */) {
            navigate('/home');
        }
    }, [navigate]); // Add navigate in the dependency array

    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
};

export default Login;

