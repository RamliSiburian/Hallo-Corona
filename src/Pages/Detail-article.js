import React from 'react'
import * as Icon from "react-icons/fa"
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API } from '../Config/Api';
import { milisToDate } from '../Component/Atoms/Millis-todate';

function DetailArticle() {
    const { id } = useParams();

    let { data: detailArticle } = useQuery("detailArticleCache", async () => {
        const response = await API.get("/Article/" + id);
        return response.data.data;

    })

    let { data: userID } = useQuery("userIDCache", async () => {
        const response = await API.get("/User/" + detailArticle?.user_id);
        return response.data.data;
    })


    return (
        <div className="Detail-article">
            <div className='container d-flex justify-content-center mb-5 mt-5'>
                <div className="Detail-artikel w-75 ">
                    <div className="head">
                        <p className="fs-3 fw-bold m-0">{detailArticle?.title}</p>
                        <p className="fs-6 m-0">{milisToDate(detailArticle?.create_at)}</p>
                        <p className="fs-6">Author : <span style={{ color: "#ff6185", fontWeight: "bold" }}>{userID?.fullname}</span> </p>
                    </div>
                    <div className="detail card pt-5" style={{ padding: "75px", boxShadow: "1px 3px 15px #FBACCC" }}>
                        <img src={detailArticle?.image} alt={detailArticle?.title} className="mb-3" />
                        <div className="mb-2 rounded fw-bold p-1 text-center "
                            style={{
                                background: "#FBACCC",
                                width: "100px",
                                border: "1px solid grey"
                            }}>{detailArticle?.hastag}</div>
                        <div style={{ textAlign: "justify" }}>{detailArticle?.desc}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailArticle;