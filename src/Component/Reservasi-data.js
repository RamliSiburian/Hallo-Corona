import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';
import { milisToDate } from './Atoms/Millis-todate';

function ReservasiData() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    let { data: consultData, refetch } = useQuery("consultDataCache", async () => {
        const response = await API.get("/Consults");
        return response.data.data;
    })

    return (
        <>
            <Container>
                <div className="product">
                    <p className="fs-2 fw-bold text-danger mt-4">Reservasi Data</p>
                    <hr />
                    {consultData?.length !== 0 ? (
                        <Table striped bordered hover variant='primary'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>User</th>
                                    <th>Subject</th>
                                    <th>Date of complain</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultData?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td className="align-middle text-center">{index + 1}</td>
                                        <td className="align-middle">
                                            {item?.fullname}
                                        </td>
                                        <td className="align-middle">{item?.subject}</td>
                                        <td className="align-middle">
                                            {milisToDate(item?.create_at)}
                                        </td>
                                        <td className="align-middle">
                                            {item?.status === "" ? (
                                                <div className='text-warning'>Waiting approve consultation live</div>
                                            ) : (
                                                item?.status === "Cancel" ? (
                                                    <div className='text-danger'>{item?.status}</div>
                                                ) : (item?.status === "Done" ? (
                                                    <span className='text-center'><Icon.FaCheckCircle style={{ color: "green", fontSize: "30px" }} /></span>
                                                ) : (
                                                    <div className='text-success'>{item?.status}</div>
                                                )
                                                )
                                            )
                                            }
                                        </td>
                                        <td className="align-middle text-center">
                                            {item?.status === "Done" ? (
                                                <span></span>
                                            ) : (
                                                <Link to={`/DetailInvo/${item?.id}`}><Icon.FaSearch /></Link>
                                            )}
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="text-center pt-5">
                            <img
                                src="./Assets/Image/noimage.png"
                                className="img-fluid rounded"
                                style={{ width: "20%" }}
                                alt="empty"
                            />
                            <div className="mt-3 text-danger fw-bold fs-3">No Data Found</div>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

export default ReservasiData;