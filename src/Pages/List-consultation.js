import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../Config/Api';
import * as Icon from 'react-icons/fa'
import { UserContext } from '../Contex/User-contex';
import { milisToDate } from '../Component/Atoms/Millis-todate';

function ListConsultation() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);

    let { data: consult, refetch } = useQuery("consultCache", async () => {
        const response = await API.get("/ConsultByUser/" + state.user.id);
        return response.data.data
    })

    let { data: userreplay } = useQuery("usersreplayCache", async () => {
        const response = await API.get("/User/" + state.user.id)
        return response.data.data
    })


    const Update = async (e) => {
        const id = e;

        let dataupdate = {
            status: "Done",
        }

        const data = await API.patch("/Consult/" + id, dataupdate);
        refetch()
        navigate("/ListConsultation");
    }


    return (
        <div className='List-article pb-5  '>
            <div className="container w-75">
                <p className="fs-1 fw-bold mt-4" style={{ color: "#ff6185" }}>Consultation</p>
                <hr />
                <div className="add-produc text-end mb-3">
                    <Link to={"/Consultation"} className="btn fw-bold mb-4" style={{ background: "#ff6185", color: "white" }}>Start Consultation <Icon.FaPlusCircle /></Link>
                </div>
                <div className=" ">
                    {consult?.map((item, index) => {
                        return (
                            <div className='mb-4 p-4 rounded' style={{ boxShadow: "0px 1px 3px #FBACCC, 0px 2px 3px #000000" }}>
                                <div className=' d-md-flex gap-5 justify-content-between' key={index}
                                    style={{ background: "#fff" }}
                                >
                                    <div className="d-flex gap-5">
                                        <div className="img d-flex align-items-center">
                                            <img src={userreplay?.image} alt="user" style={{ width: "60px", height: "60px", marginLeft: "20px", borderRadius: "50%" }} />
                                        </div>
                                        <div className="detail">
                                            <p className="fs-4 fw-bold m-0">{item?.subject}</p>
                                            <p style={{ fontSize: "12px", margin: "0" }}> {milisToDate(item?.create_at)}</p>
                                            <p className="fs-6 m-0">{item?.description}</p>
                                        </div>
                                    </div>
                                    <div className="live d-flex flex-column justify-content-between">
                                        <p className=" fs-5 fw-bold">{item?.live_consultation} </p>
                                        {item?.status === "Done" ? (
                                            <span className='text-center'><Icon.FaCheckCircle style={{ color: "green", fontSize: "30px" }} /></span>
                                        ) : (item?.status === "Cancel" || item?.status === "" ? (
                                            <span></span>
                                        ) : (
                                            <p className='bg-success rounded text-center text-white p-1'
                                                style={{ cursor: "pointer" }}
                                                onClick={() => Update(item?.id)}
                                            >Done</p>
                                        )

                                        )}
                                    </div>
                                </div>
                                <hr />


                                <div className="detail">
                                    {item?.replay != "" ? (
                                        <div className="replay d-flex gap-3 align-items-center">
                                            <div className="img d-flex align-items-center" style={{ marginLeft: "120px" }}>
                                                <img src="./Assets/Image/doctor.png" alt="user" style={{ width: "50px", height: "50px", marginLeft: "20px", borderRadius: "50%" }} />
                                            </div>
                                            {item?.status === "Cancel" ? (
                                                <div className='d-flex justify-content-between w-100'>
                                                    <p>{item?.replay}</p>
                                                    <p className="bg-danger text-white p-1 rounded">Canceled</p>
                                                </div>
                                            ) : (
                                                <span className="fs-6 m-0">
                                                    {item?.replay}. &nbsp;
                                                    {item?.status === "Done" ? (
                                                        <span></span>
                                                    ) : (
                                                        <span><a href={item?.link} target="_blank">Here</a></span>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='fs-4 fw-bold text-center text-warning' style={{}}>Waiting For Replay</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </div >
    )
}

export default ListConsultation;