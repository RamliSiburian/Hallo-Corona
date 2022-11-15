import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import GlobalButton from '../Atoms/Global-button';
// import { useNavigate } from 'react-router-dom';
import { API } from '../../Config/Api';

function Register({ show, setShow, setShowLogin }) {
    const handleClose = () => setShow(false);
    // const navigate = useNavigate()
    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        status: "",
    });

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/Register', form);

            if (response.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Your registration success :).
                        <br />
                        Please click link below to login !!!
                    </Alert>
                )
                setMessage(alert);

                setForm({
                    username: "",
                    email: "",
                    password: "",
                    status: "",
                })

                setTimeout(navigates, 1000);

                function navigates() {
                    setShow(false);
                    setShowLogin(true);
                }
            }
        } catch (error) {

            console.log(error.response.data.message);
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.response.data.message}
                </Alert>
            )
            setMessage(alert);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-1 fw-bold' style={{ color: "#ff6185" }}>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type='text'
                                name='username'
                                onChange={handleOnChange}
                                value={form.username}
                                placeholder='Username'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type='email'
                                name='email'
                                onChange={handleOnChange}
                                value={form.email}
                                placeholder='Email'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type='password'
                                name='password'
                                onChange={handleOnChange}
                                value={form.password}
                                placeholder='Password'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Select aria-label="Default select example"
                                name='status'
                                value={form.status}
                                onChange={handleOnChange}
                            >
                                <option hidden>Select Status</option>
                                <option value="Doctor">As Doctor</option>
                                <option value="Patient">As Patient</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type='submit' className='btn text-white fw-bold link w-100 border-0' style={{ background: "#ff6185" }}>Register</Button>
                    </Form>
                </Modal.Body>
                <p className='text-center'>
                    Alredy have an account ? click
                    <span
                        className='ms-1 fw-bold'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setShow(false);
                            setShowLogin(true);
                        }}
                    >
                        Here
                    </span>
                </p>
            </Modal>
        </>
    );
}

export default Register;