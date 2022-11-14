import React, { useState } from 'react'
import * as Icon from "react-icons/fa"
import { Container, Form, Alert } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import GlobalForm from '../Component/Atoms/Global-form';
import GlobalButton from '../Component/Atoms/Global-button';
import { API } from '../Config/Api';

function AddArticle() {
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        image: "",
        desc: "",
        hastag: "",
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url)
        }
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("title", form.title);
            formData.set("desc", form.desc);
            formData.set("hastag", form.hastag);
            const data = await API.post("/Article", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });
            if (data.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1 fw-bold">
                        Product has been added
                    </Alert>
                )
                setMessage(alert);
                setPreview(null)
                setForm({
                    image: "",
                    title: "",
                    desc: "",
                    hastag: 0,
                })

                const timer = setTimeout(navigates, 2000);

                function navigates() {
                    navigate("/Articles");
                }


            }
        } catch (error) {

            console.log(error.data.data.message);
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
            <Container className='mb-5'>
                <div className="Add-article">
                    <div className="mt-5 d-md-flex align-items-center">
                        <p className="fs-5 fw-bold me-3"><Link to={`/ListArticle`} className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
                        <p className="fs-3 fw-bold"> Add Article</p>
                    </div>
                    <hr />
                    {message && message}
                    <div className="article d-flex justify-content-center">
                        <Form onSubmit={(e) => handleOnSubmit.mutate(e)} className="w-50">
                            <Form.Group className='mb-3' >
                                <GlobalForm
                                    type='text'
                                    name='title'
                                    placeholder='Title'
                                    value={form.title}
                                    onChange={handleOnChange}
                                    required='required'
                                    autofocus='autofocus'
                                    autocomplete='off'
                                />
                            </Form.Group>
                            <Form.Group className='w-100 mb-3' controlId="formBasicimage">
                                <Form.Label className="btn text-white" style={{
                                    backgroundColor: "#FF6185"
                                }}>
                                    Upload image &nbsp; <Icon.FaImage />
                                </Form.Label>
                                <GlobalForm
                                    type="file"
                                    name="image"
                                    onChange={handleOnChange}
                                    hidden
                                />
                            </Form.Group>
                            {preview && (
                                <div>
                                    <img className='rounded'
                                        src={preview}
                                        style={{
                                            maxWidth: "150px",
                                            maxHeight: "150px",
                                            objectFit: "cover",
                                        }}
                                        alt={preview}
                                    />
                                </div>
                            )}
                            <Form.Group className='mb-3 mt-3' >
                                <Form.Control as="textarea" rows={3} style={{ resize: "none" }}
                                    name='desc'
                                    value={form.desc}
                                    onChange={handleOnChange}
                                    placeholder='Description'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' >
                                <GlobalForm
                                    type='text'
                                    name='hastag'
                                    value={form.hastag}
                                    onChange={handleOnChange}
                                    placeholder='Hastag'
                                    required='required'
                                    autocomplete='off'
                                />
                            </Form.Group>
                            <Form.Group className='d-md-flex justify-content-end mt-4'>
                                <GlobalButton
                                    name='Post'
                                    type='submit'
                                    className='w-25 bg-danger border-0'
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddArticle;