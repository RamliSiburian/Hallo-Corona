import React from 'react'
import * as Icon from "react-icons/fa"
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API } from '../Config/Api';

function DetailArticle() {
    const { id } = useParams();

    let { data: detailArticle } = useQuery("detailArticleCache", async () => {
        const response = await API.get("/Article/" + id);
        return response.data.data;

    })
    return (
        <div className="Detail-article">
            <div className='container d-flex justify-content-center mb-5 mt-5'>
                <div className="Detail-artikel w-75 ">
                    <div className="head">
                        <p className="fs-3 fw-bold">{detailArticle?.title}</p>
                        <p className="fs-2">{detailArticle?.creat_at}</p>
                        {/* <p className="fs-6">Author : <span style={{ color: "#ff6185", fontWeight: "bold" }}>{detailArticle?.title}</span> </p> */}
                    </div>
                    <div className="detail card" style={{ padding: "75px", boxShadow: "5px 5px 15px black" }}>
                        <img src={detailArticle?.image} alt={detailArticle?.title} className="mb-3" />
                        <div className="mb-2 rounded p-1 text-center "
                            style={{
                                width: "100px",
                                border: "1px solid grey"
                            }}>{detailArticle?.hastag}</div>
                        <div>{detailArticle?.desc}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailArticle;