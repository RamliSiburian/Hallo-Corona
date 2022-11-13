import React, { useContext, useEffect, useState } from 'react';
import '../Style/Style.css';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../Config/Api'
import * as Icon from "react-icons/fa"
import { UserContext } from '../Contex/User-contex';

function Profile() {
    const navigate = useNavigate();
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
    return (
        <>
            <Container>
                <div className="profile d-flex justify-content-center mt-5">
                    <div className="card p-4 shadow-lg">
                        <div className="profileDetail d-flex gap-5 justify-content-between">
                            <div className="detail">
                                <h2 className='fw-bold fs-5 m-0 p-0 mb-2'><u>Personal Info</u></h2>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaUserCircle className='me-3' />
                                    <p className=''>{profile?.fullname === "" ? ("-") : (<>{profile?.fullname}</>)}
                                        <span className=''>Full Name</span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaMailBulk className='me-3' />
                                    <p className=''>{profile?.email === "" ? ("-") : (<>{profile?.email}</>)}
                                        <span className=''>Email</span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaUserFriends className='me-3' />
                                    <p className=''>{profile?.status === "" ? ("-") : (<>{profile?.status}</>)}
                                        <span className=''>Status</span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaTransgenderAlt className='me-3' />
                                    <p className=''>{profile?.gender === "" ? ("-") : (<>{profile?.gender}</>)}
                                        <span className=''>Gender</span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaPhoneSquare className='me-3' />
                                    <p className=''>{profile?.phone === "" ? ("-") : (<>{profile?.phone}</>)}
                                        <span className=''>Phone</span>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <Icon.FaMapMarkerAlt className='me-3' />

                                    <p className=''> {profile?.address === "" ? ("-") : (<>{profile?.address}</>)}
                                        <span className=''>Address</span>
                                    </p>
                                </div>
                            </div>
                            <div className="image h-100 d-flex flex-column justify-content-between" >
                                {profile?.image === "http://localhost:5000/Uploads/user/" ? (
                                    <img src="./Assets/Image/noimage.png" alt="No image found" />
                                ) : (
                                    <img src={profile?.image} alt="Not found" className='rounded profileImage' />
                                )}
                                <Link to="/EditProfile" className='link btn btn-primary'>Edit Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile;