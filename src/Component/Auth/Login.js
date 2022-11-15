import React, { useContext, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GlobalButton from '../Atoms/Global-button';
import GlobalForm from '../Atoms/Global-form';
import { useMutation } from 'react-query';
import { API } from '../../Config/Api'
import { UserContext } from '../../Contex/User-contex';


function Login({ show, setShow, setShowRegister }) {
    const handleClose = () => setShow(false)
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);

    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    })

    const handleOnChange = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name]: e.target.value,
        });
    }
    const HandleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const dataLogin = await API.post("/Login", formLogin);
            // console.log(dataLogin);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: dataLogin.data.data,
            })

            var users = dataLogin.data.data
            if (users.status === "Doctor") {
                navigate("/Doctor")
                setShow(false)
            } else if (users.status === "Patient") {
                navigate("/Patient")
                setShow(false)
            }

        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Email or password wrong
                </Alert>
            )

            setMessage(alert);
        }
    });



    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title fs-1 fw-bold' style={{ color: "#ff6185" }}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                        <Form.Group className='mb-3'>
                            <GlobalForm
                                type='text'
                                name='username'
                                onChange={handleOnChange}
                                value={formLogin.username}
                                placeholder='Username'
                                required='required'
                                autofocus='autofocus'
                                autocomplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <GlobalForm
                                type='password'
                                name='password'
                                onChange={handleOnChange}
                                value={formLogin.password}
                                placeholder='Password'
                                required='required'
                            />
                        </Form.Group>
                        <Button type='submit' className='btn text-white fw-bold link w-100 border-0' style={{ background: "#ff6185" }}>Login</Button>
                    </Form>
                </Modal.Body>
                <p className='text-center'>
                    Don't have an account ? click
                    <span
                        className='ms-1 fw-bold'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setShow(false);
                            setShowRegister(true);
                        }}
                    >
                        Here
                    </span>
                </p>
            </Modal>
        </>
    )
}

export default Login;