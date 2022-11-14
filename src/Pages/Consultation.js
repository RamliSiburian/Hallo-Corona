import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import GlobalForm from '../Component/Atoms/Global-form';
import * as Icon from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { API } from '../Config/Api'
import { Link, useNavigate } from 'react-router-dom';

function Consultation() {
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        phone: "",
        born_date: "",
        age: 0,
        height: 0,
        weight: 0,
        gender: "",
        subject: "",
        live_consultation: "",
        description: "",
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    }
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            let Datas = {
                fullname: form?.fullname,
                phone: form?.phone,
                born_date: form?.born_date,
                age: parseInt(form?.age),
                height: parseInt(form?.height),
                weight: parseInt(form?.weight),
                gender: form?.gender,
                subject: form?.subject,
                live_consultation: form?.live_consultation,
                description: form?.description,
            }

            const response = await API.post("/Consult", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            })
            if (response.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1 fw-bold">
                        Product has been added
                    </Alert>
                )
                setMessage(alert);
                setForm({
                    fullname: "",
                    phone: "",
                    born_date: "",
                    age: 0,
                    height: 0,
                    weight: 0,
                    gender: "",
                    subject: "",
                    live_consultation: "",
                    description: "",
                })

                const timer = setTimeout(navigates, 1000);

                function navigates() {
                    navigate("/Patient");
                }


            }
        } catch (error) {

            // console.log(error.data.data.message);
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.data.data.message}
                </Alert>
            )
            setMessage(alert);
        }
    })

    return (
        <>
            <Container>
                <div className="add-produk mt-5">
                    <div className="d-md-flex align-items-center">
                        <p className="fs-5 fw-bold me-3"><Link to={"/Patient"} className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
                        <p className='fs-3 fw-bold'>Reservasi Consultation</p>
                    </div>
                    <hr />
                    {message && message}
                    <div className="d-md-flex justify-content-center">
                        <Form onSubmit={(e) => handleOnSubmit.mutate(e)} className='w-75'>
                            <Form.Group className="mb-3 border-2" controlId="formBasicPrice">
                                <GlobalForm
                                    type='text'
                                    name='fullname'
                                    value={form.fullname}
                                    onChange={handleOnChange}
                                    placeholder='Fullname'
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 border-2" controlId="formBasicPrice">
                                <GlobalForm
                                    type='text'
                                    name='phone'
                                    value={form.phone}
                                    onChange={handleOnChange}
                                    placeholder='Phone'
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 border-2">
                                <Row>
                                    <Col md={4}>
                                        <GlobalForm className="mb-3 mb-md-0 "
                                            type='date'
                                            name='born_date'
                                            value={form.born_date}
                                            onChange={handleOnChange}
                                            placeholder='Born Date'
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <GlobalForm className="mb-3 mb-md-0 "
                                            type='number'
                                            name='age'
                                            value={form.age}
                                            onChange={handleOnChange}
                                            placeholder='Age'
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <GlobalForm className="mb-3 mb-md-0"
                                            type='number'
                                            name='height'
                                            value={form.height}
                                            onChange={handleOnChange}
                                            placeholder='Height'
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <GlobalForm
                                            type='number'
                                            name='weight'
                                            value={form.weight}
                                            onChange={handleOnChange}
                                            placeholder='Weight'
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Floating label select example"
                                    name='gender'
                                    value={form.gender}
                                    onChange={handleOnChange}
                                >
                                    <option hidden>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <GlobalForm
                                    type='text'
                                    name='subject'
                                    value={form.subject}
                                    onChange={handleOnChange}
                                    placeholder='Subject'
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 border-2" controlId="formBasicQty">
                                <GlobalForm
                                    type='date'
                                    name='live_consultation'
                                    value={form.live_consultation}
                                    onChange={handleOnChange}
                                    placeholder='Live Consultation'
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 border-2" controlId="formBasicdecription">
                                <Form.Control as="textarea" rows={3} style={{ resize: "none" }}
                                    name='description'
                                    value={form.description}
                                    onChange={handleOnChange}
                                    placeholder='Description'
                                />
                            </Form.Group>
                            <Form.Group className='mt-5 mb-5 d-flex justify-content-md-end justify-content-center'>
                                <Button type='submit' style={{ backgroundColor: "#433434", width: "200px" }} className="border-0">
                                    Save
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>

                </div>
            </Container>
        </>
    )
}

export default Consultation;