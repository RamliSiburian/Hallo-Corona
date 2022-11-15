import { Modal, Button, Table, FormLabel, FloatingLabel, Form, Alert } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../Config/Api'
import * as Icon from 'react-icons/fa'
import { milisToDate } from '../Atoms/Millis-todate'
import { useContext, useState } from 'react'
import { UserContext } from '../../Contex/User-contex'

export default function DetailInfoDoctor() {

    const [message, setMessage] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()
    const [state, dispatch] = useContext(UserContext);

    let { data: detailInvo } = useQuery("detailInvoCache", async () => {
        const response = await API.get("/Consult/" + id)
        return response.data.data;
    })

    const [replays, setReplays] = useState({
        replay: "",
        link: "",
        status: "Waiting live consutation",
        doctor_id: state.user.id,
    })

    const handleOnChange = (e) => {
        setReplays({
            ...replays,
            [e.target.name]: e.target.value,
        });
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();


            const data = await API.patch("/Consult/" + detailInvo.id, replays);
            if (data.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1 fw-bold">
                        Reservation updated
                    </Alert>
                )
                setMessage(alert);

                const timer = setTimeout(navigates, 1000);

                function navigates() {
                    navigate("/Doctor");
                }


            }
        } catch (error) {

            // console.log(error);
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.data.data.message}
                </Alert>
            )
            setMessage(alert);
        }
    })

    const cancel = async (e) => {
        let dataupdate = {
            replay: e,
            status: "Cancel",
            doctor_id: state.user.id,
        }

        const data = await API.patch("/Consult/" + id, dataupdate);
        navigate("/Doctor");
    }

    return (
        <div className=''>
            <div className="container mt-5 d-md-flex align-items-center">
                <p className="fs-5 fw-bold me-3"><Link to={`/Doctor`} className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
            </div>
            <hr />
            {message && message}
            <div className="detail-info container ">
                <div className="head d-md-flex">
                    <div className="left" style={{ flex: "4" }}>
                        <p className="fs-3 fw-bold">{detailInvo?.subject}</p>
                        <p style={{ fontSize: "14px" }}>{detailInvo?.description}</p>
                    </div>
                    <div className="right fw-bold d-flex flex-column justify-content-between p-3" style={{ flex: "2" }}>
                        <div className="complainDate d-flex align-items-center gap-2">
                            <Icon.FaCircleNotch style={{ color: "#ff6185" }} />
                            <p className="fs-6 m-0">Date of complaint <span style={{ fontSize: "11px", display: "block" }}>{milisToDate(detailInvo?.create_at)}</span></p>
                        </div>
                        <div className="liveconsult d-flex align-items-center gap-2">
                            <Icon.FaCircle style={{ color: "#ff6185" }} />
                            <p className="fs-6 m-0">Live consultation <span style={{ fontSize: "11px", display: "block" }}>{detailInvo?.live_consultation}</span></p>
                        </div>
                    </div>
                </div>
                <div className="data">
                    <Table striped bordered hover size="sm" className='mt-3'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Height</th>
                                <th>Wieght</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{detailInvo?.fullname}</td>
                                <td>{detailInvo?.gender}</td>
                                <td>{detailInvo?.phone}</td>
                                <td>{detailInvo?.age}</td>
                                <td>{detailInvo?.height}</td>
                                <td>{detailInvo?.weight}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="response">
                    <p className="fs-6  mt-4 fw-bold">Give Response</p>
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                    as="textarea"
                                    name="replay"
                                    placeholder="Give response"
                                    value={replays.replay}
                                    onChange={handleOnChange}
                                    style={{ height: '100px', resize: "none" }}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                name="link"
                                value={replays.link}
                                onChange={handleOnChange}
                                type="text" placeholder="Link Consultation" />
                        </Form.Group>
                        <div className="text-end mt-5 mb-5">
                            <Button size="sm" onClick={() => cancel(replays.replay)} className="btn-danger me-2" style={{ width: '135px' }}>Cancel</Button>
                            <Button size="sm" type='submit' className="btn-success" style={{ width: '135px' }}>Approve</Button>
                        </div>
                    </Form>
                </div> 


            </div>
        </div>
    )
}
