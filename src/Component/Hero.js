import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../Contex/User-contex';
import Login from '../Component/Auth/Login'

function Hero() {
    const [showLogin, setShowLogin] = useState(false);
    const [state, dispatch] = useContext(UserContext);

    return (
        <div className='Hero d-flex align-items-center' style={{ backgroundColor: "#FF6185", minHeight: "300px" }}>
            <div className="container d-md-flex pt-5 pb-5">
                <div className="left" style={{ flex: 2 }}>
                    <div className="titles d-md-flex">
                        <img src="/Assets/Image/Hero/corona.png" alt="Corona" width={100} height={100} />
                        <div className="title text-white">
                            <p className='fs-2 fw-bold m-0'>Cegah Covid-19</p>
                            <p className='fs-4 m-0'>Dengan melakukan :</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {state.isLogin ? (<Link to="/Consultation" className='link bg-light p-2 rounded ' >
                            <img src="/Assets/Image/Hero/dokter.png" alt="Konsultasi" width="25px" height="25px" /> Konsultasi Dengan Dokter
                        </Link>) : (
                            <Link onClick={() => setShowLogin(true)} className='link bg-light p-2 rounded ' >
                                <img src="/Assets/Image/Hero/dokter.png" alt="Konsultasi" width="25px" height="25px" /> Konsultasi Dengan Dokter
                            </Link>
                        )}
                    </div>
                </div>
                <div className="right d-md-flex" style={{ flex: 3 }}>
                    <div className="tips">
                        <img src="/Assets/Image/Hero/orang.png" alt="Jauhi keramaian" />
                        <p>Tidak mendatangi tempat ramai</p>
                    </div>
                    <div className="tips">
                        <img src="/Assets/Image/Hero/tangan.png" alt="Tidak berjabat tangan" />
                        <p>Hindari untuk berjabat tangan</p>
                    </div>
                    <div className="tips">
                        <img src="/Assets/Image/Hero/mata.png" alt="Tidak menyentuh mata" />
                        <p>Hindari menyentuh mata secara langsung</p>
                    </div>
                    <div className="tips">
                        <img src="/Assets/Image/Hero/home.png" alt="Tetap dirumah" />
                        <p>Tetap dirumah sampai pandemi ini selesai</p>
                    </div>
                </div>
            </div>
            <Login show={showLogin} setShow={setShowLogin} />
        </div>
    )
}

export default Hero;