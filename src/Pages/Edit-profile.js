import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Container, Form, InputGroup } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { useMutation, useQuery } from 'react-query';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';
import GlobalForm from '../Component/Atoms/Global-form';

function EditProfile() {
    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    let { data: profile } = useQuery("profileEditCache", async () => {
        const response = await API.get("/User/" + state.user?.id);
        return response.data.data;
    })

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        gender: "",
        phone: "",
        address: "",
        image: "",
    })

    useEffect(() => {
        if (profile) {
            setPreview(profile.image);
            setForm({
                ...form,
                fullname: profile.fullname,
                email: profile.email,
                gender: profile.gender,
                phone: profile.phone,
                address: profile.address,
            })
        }
    }, [profile]);

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set("fullname", form.fullname);
            formData.set("email", form.email);
            formData.set("gender", form.gender);
            formData.set("phone", form.phone);
            formData.set("address", form.address);

            const response = await API.patch("/User/" + profile.id, formData);

            if (response.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1 fw-bold">
                        Profile has been Updated
                    </Alert>
                )
                setMessage(alert);
            }
            setPreview(null);
            const timer = setTimeout(navigates, 1000);

            function navigates() {
                navigate(`/Profile`);
            }


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='p-5'>
            <Container className='w-50 card shadow p-3'>
                <div className="Edit-profile d-md-flex align-items-center">
                    <p className="fs-5 fw-bold me-3"><Link to={`/Profile`} className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
                    <p className='fs-3 fw-bold'>Edit Profile</p>
                </div>
                <hr />
                {message && message}
                <Form onSubmit={(e) => handleOnSubmit(e)}>
                    {preview && (
                        <div>
                            <img className='rounded mb-2'
                                src={preview}
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    objectFit: "cover",
                                }}
                                alt="No image found"
                            />
                        </div>
                    )}
                    <div className="mb-3 mt-3 d-md-flex gap-3">
                        <Form.Group className="w-100" controlId="formBasicEmail">
                            <Form.Label>
                                Fullname
                            </Form.Label>
                            <GlobalForm
                                type='text'
                                name='fullname'
                                defaultValue={form?.fullname}
                                onChange={handleOnChange}
                                placeholder={form?.fullname}
                            />
                        </Form.Group>
                        <Form.Group className='w-100 text-end mt-4' controlId="formBasicimage">
                            <GlobalForm
                                type="file"
                                name="image"
                                onChange={handleOnChange}
                                hidden
                            />
                            <Form.Label className="btn text-white" style={{
                                backgroundColor: "#FF6185"
                            }}>
                                Upload image &nbsp; <Icon.FaImage />
                            </Form.Label>
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <GlobalForm
                            type='text'
                            name='email'
                            defaultValue={form?.email}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>
                            Gender
                        </Form.Label>
                        <Form.Select aria-label="Floating label select example"
                            name='gender'
                            defaultValue={form?.gender}
                            onChange={handleOnChange}
                        >
                            <option hidden>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 border-2" controlId="formBasicPhone">
                        <Form.Label>
                            Phone Number
                        </Form.Label>
                        <GlobalForm
                            type='number'
                            name='phone'
                            defaultValue={form?.phone}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>
                            Address
                        </Form.Label>
                        <GlobalForm
                            type='text'
                            name='address'
                            defaultValue={form?.address}
                            onChange={handleOnChange}
                        />
                    </Form.Group>
                    <Form.Group className='mt-5 d-flex justify-content-md-end justify-content-center'>
                        <Button type='submit' style={{ backgroundColor: "#FF6185", width: "200px" }} className="border-0 mb-5">
                            Save
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default EditProfile;