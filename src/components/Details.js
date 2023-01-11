import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleData } from '../api/apiData';
import dateFormat, { masks } from "dateformat";

const Details = () => {
    const [data, setData] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getSingleData(id)
            .then(response => {
                setData(response.data);
            });
    });
   
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className="view">
                            <h2 className='text-center'>Welcome {data.name}</h2>
                            <hr />
                            <p><b>Name: </b>{data.name}</p>
                            <p><b>Email: </b>{data.email}</p>
                            <p><b>Phone: </b>{data.phone}</p>
                            <p><b>Unique ID: </b>{data._id}</p>
                            <p><b>Join Date: </b>{dateFormat(data.createdAt, 'dd mmmm yyyy "At" h:MM TT')}</p>
                        </div>
                        <p className='text-center mt-4'>
                            <NavLink to='/' className='text-success'>Back to Home</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;