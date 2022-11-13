import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';
import { milisToDate } from '../Component/Atoms/Millis-todate';

function ListConsultation() {
    const [state, dispatch] = useContext(UserContext);
    // console.log("state here", state);

    let { data: consult } = useQuery("consultCache", async () => {
        const response = await API.get("/ConsultByUser/" + state.user.id);
        // console.log(response.data.data);
        return response.data.data
    })
    let { data: userreplay } = useQuery("usersreplayCache", async () => {
        const response = await API.get("/User/" + state.user.id)
        return response.data.data
    })

    return (
        <div className='List-article pb-5  '>
            <div className="container w-75">
                <p className="fs-1 fw-bold text-danger mt-4">Consultation</p>
                <hr />
                <div className=" ">
                    {consult?.map((item, index) => {
                        return (
                            <div className='mb-5 p-4 rounded shadow-lg'>
                                <div className=' d-md-flex gap-5 justify-content-between' key={index}
                                    style={{ background: "#fff" }}
                                >
                                    <div className="d-flex gap-5">
                                        <div className="img d-flex align-items-center">
                                            <img src={userreplay?.image} alt="user" style={{ width: "75px", height: "75px", marginLeft: "20px", borderRadius: "50%" }} />
                                        </div>
                                        <div className="detail">
                                            <p className="fs-4 fw-bold m-0">{item?.subject}</p>
                                            <p style={{ fontSize: "12px", margin: "0" }}> {milisToDate(item?.create_at)}</p>
                                            <p className="fs-6 m-0">{item?.description}</p>
                                        </div>
                                    </div>
                                    <div className="live d-flex flex-column justify-content-between">
                                        <p className=" fs-5 fw-bold">{item?.live_consultation} </p>
                                        {/* {item?.replay === "" ? (
                                            <p className='bg-warning p-1 text-center rounded'>Pending</p>
                                        ) : (
                                            <p className='bg-success text-white text-center p-1  rounded'>Waiting live consultation</p>
                                        )

                                        } */}
                                    </div>
                                </div>
                                <hr />


                                <div className="detail">
                                    {item?.replay != "" ? (
                                        <div className="replay d-flex gap-3 align-items-center">
                                            <div className="img d-flex align-items-center" style={{ marginLeft: "120px" }}>
                                                <img src="./Assets/Image/doctor.png" alt="user" style={{ width: "75px", height: "75px", marginLeft: "20px", borderRadius: "50%" }} />
                                            </div>
                                            <p className="fs-6 m-0">{item?.replay}. <a href={item?.link} target="_blank">Here</a></p>
                                        </div>
                                    ) : (
                                        <div className='fs-4 fw-bold text-center text-warning' style={{}}>Waiting For Replay</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default ListConsultation;