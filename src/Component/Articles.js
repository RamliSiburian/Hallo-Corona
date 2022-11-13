import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../Config/Api';
import { UserContext } from '../Contex/User-contex';
import DeleteArticle from './Modal/Delete-article';

function Articles() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user_id = state.user.id

    let { data: articleList, refetch } = useQuery("articleListCache", async () => {
        const response = await API.get("/ArticleByUser/" + user_id);
        return response.data.data;
    })

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/Article/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            handleClose();
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);


    return (
        <>
            <Container>
                <div className="article">
                    <p className="fs-2 fw-bold mt-4">List Article</p>
                    <hr />
                    <div className="add-produc text-end mb-3">
                        <Link to={"/AddArticle"} className="btn btn-primary">Add Article <Icon.FaPlusCircle /></Link>
                    </div>
                    {articleList?.length !== 0 ? (
                        <Table striped bordered hover variant='primary'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Hastag</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articleList?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td className="align-middle text-center">{index + 1}</td>
                                        <td className="align-middle">
                                            <img
                                                src={item?.image}
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    borderRadius: "2px",
                                                }}
                                                alt={item?.title}
                                            />
                                        </td>
                                        <td className="align-middle">{item?.title}</td>
                                        <td className="align-middle">
                                            {item?.desc}
                                        </td>
                                        <td className="align-middle">{item?.hastag}</td>
                                        <td className="align-middle ">
                                            <Button
                                                onClick={() => {
                                                    navigate("/EditArticle/" + item?.id);
                                                }}
                                                className="btn-sm btn-success me-2 mb-2"
                                                style={{ minWidth: "75px" }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                                className="btn-sm btn-danger"
                                                style={{ minWidth: "75px" }}
                                            >
                                                Delete
                                            </Button>
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
            <DeleteArticle
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default Articles;