import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import Register from './Auth/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Auth/Login';
import { API } from '../Config/Api'
import * as Icon from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contex/User-contex';
import GlobalButton from './Atoms/Global-button';

function Navbars() {
    window.addEventListener("scroll", function () {
        let sticky = document.querySelector("#sticky");
        sticky.classList.toggle("sticky", window.scrollY > 0);
    })

    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [state, dispatch] = useContext(UserContext);
    const [profile, setProfile] = useState(null)
    const getProfile = async () => {
        try {
            const response = await API.get("/User/" + state.user?.id);
            setProfile(response.data.data)
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        if (state.user) {
            getProfile();
        }
    }, [state])

    function Logout() {
        dispatch({
            type: "AUTH_ERROR",
        });
        navigate("/");
        setShowLogin(true);
    }

    return (
        <div id='navbar'>
            <Navbar expand="lg" id='sticky' className="navbar" >
                <Container>
                    <Navbar.Brand>
                        {profile?.status === "Doctor" ? (<Link className='link fs-2 fw-bold' to="/Doctor">Hallo Corona</Link>
                        ) : (
                            <Link className='link fs-2 fw-bold' to="./Patient">Hallo Corona</Link>
                        )}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end fw-bold'>
                        {state.isLogin ? (<Nav className="me-end">
                            {state.user.status === "Patient" ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        {profile?.image === "http://localhost:5000/Uploads/user/" ? (
                                            <img src="./Assets/Image/noimage.png" alt="Patient" className=" rounded-circle" data-bs-toggle="dropdown" style={{ width: "50px", height: "50px" }} />
                                        ) : (
                                            <img src={profile?.image} alt="Patient" className=" rounded-circle" data-bs-toggle="dropdown" style={{ width: "50px", height: "50px" }} />
                                        )}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item ><Link to="/Profile" className='link' ><Icon.FaUserAlt className='me-2' /> Profile</Link></Dropdown.Item>
                                        <Dropdown.Item ><Link to="/ListConsultation" className='link' ><Icon.FaShareAlt className='me-2' /> Consultation</Link></Dropdown.Item>
                                        <Dropdown.Item onClick={Logout} style={{ cursor: "pointer" }}><Icon.FaSignOutAlt className='me-2' /> Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <img src={profile?.image} alt="Doctor" className=" rounded-circle" data-bs-toggle="dropdown" style={{ width: "50px", height: "50px" }} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Link to="/Profile" className='link' ><Icon.FaUserAlt className='me-2' /> Profile</Link></Dropdown.Item>
                                        <Dropdown.Item><Link to="/AddArticle" className='link' ><Icon.FaPlusCircle className='me-2' /> Add Article</Link></Dropdown.Item>
                                        <Dropdown.Item><Link to="/Articles" className='link' ><Icon.FaListAlt className='me-2' /> List Article</Link></Dropdown.Item>
                                        <Dropdown.Item onClick={Logout} style={{ cursor: "pointer" }}><Icon.FaSignOutAlt className='me-2' /> Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Nav>) : (<Nav className="me-end gap-3">
                            <Button className='first' variant="outline-danger" onClick={() => setShowRegister(true)}>Sign Up</Button>
                            <Button className='last' variant="danger" onClick={() => setShowLogin(true)}>Sign In</Button>
                        </Nav>
                        )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Login show={showLogin} setShow={setShowLogin} setShowRegister={setShowRegister} />
            <Register show={showRegister} setShow={setShowRegister} setShowLogin={setShowLogin} />
        </div>
    )
}

export default Navbars;