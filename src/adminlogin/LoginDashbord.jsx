import React, { useState } from "react";
import './LoginDashbord.scss';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const LoginDashbord = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const notifySuccess = (message) => {
        toast.success(message, {
            position: 'top-center', 
        });
    };
    
    const notifyError = (message) => {
        toast.error(message, {
            position: 'top-center', 
        });
    };
    const resetLoginForm = () => {
        setUserName('');
        setPassword('');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:3001/user?userName=${userName}`)
            .then(response => {
                const user = response.data[0];

                if (user && user.password === password) {
                    notifySuccess('Login successful!');
                    resetLoginForm();
                    window.location.href = 'http://localhost:3000/AdminPanel';

                } else {
                    notifyError('Login failed! Please check your credentials.');
                    resetLoginForm();
                }
            })
            .catch(error => {
                console.log("Error fetching data:", error);
                notifyError('An error occurred while logging in.');
                resetLoginForm();
            });


    };

    return (
        <>
            <ToastContainer />
            <section className="adminDashbord_sec">
                <div className="container">
                    <div className="row adminDashbord_row">
                        <div className="adminDashbord_col">
                            <div className="adminDashbord_card">
                                <h2>Admin Panel</h2>
                                <Form onSubmit={handleLoginSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group className="form-group">
                                            <Form.Control className="adminDashbord" type="text" placeholder="Enter your UserName" onChange={(e) => setUserName(e.target.value)} value={userName} required />
                                        </Form.Group>

                                        <Form.Group className="form-group">
                                            <Form.Control className="adminDashbord" type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                        </Form.Group>
                                    </Row>
                                    <div className="form-btn">
                                        <Button type="submit" className="login-btn">Log in</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default LoginDashbord;
