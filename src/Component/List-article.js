import React from 'react'
import { Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../Config/Api';

function ListArticle() {
    let { data: articles } = useQuery("articlesCache", async () => {
        const response = await API.get("/Articles");
        // console.log(response.data.data);
        return response.data.data
    })
    // console.log(articles);

    return (
        <div className='List-article pb-5 '>
            <div className="container">
                <p className="fs-1 fw-bold text-center p-5 pb-0">Artikel Hari Ini</p>
                <hr />
                <div className="article d-md-flex gap-5 flex-wrap">
                    {articles?.map((item, index) => {
                        return (
                            <Card style={{ width: '17rem', minHeight: "250px" }} className="card-article" key={index}>
                                {item?.image === "http://localhost:5000/Uploads/article/" ? (
                                    <Card.Img variant="top" src="./Assets/Image/noimage.png" alt="Gambar" style={{ height: "170px" }} />
                                ) : (
                                    <Card.Img variant="top" src={item?.image} alt="Gambar" style={{ height: "170px" }} />
                                )}
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/Detail/${item?.id}`} className='link fw-bold fs-6'>{item?.title}</Link>
                                    </Card.Title>
                                    <Card.Text style={{ textAlign: "justify" }}>
                                        {item?.desc.slice(0, 50)}...
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListArticle;