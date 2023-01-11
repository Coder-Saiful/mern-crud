import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../utils/config';
import axios from 'axios';

const Edit = () => {

    const {id} = useParams();

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    const {name, email, phone} = values;

    

    const showData = () => {
        axios.get(`${API}/${id}`)
        .then(response => {
            setValues(response.data);
        });
    }

    useEffect(() => {
        showData();
    }, []);

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        setDisabled(true);
        
        axios.put(`${API}/${id}`, {name: name, email: email, phone: phone})
            .then(response => {
                setDisabled(false);
                setError(false);
                toast.success(`${response.data.message}`, {
                    autoClose: 3000
                });
            })
            .catch(err => {
                setDisabled(false);
            });
    }
    return (
        <>
        <ToastContainer />
            
            <section className='container-fluid'>
                <div className="row">
                    <div className="col-lg-5 m-auto">
                        <div className="dataForm">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center">Edit Data</h2>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" name='name' value={name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="text" className="form-control" name='email' value={email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone:</label>
                                <input type="text" className="form-control" name='phone' value={phone} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={disabled}>Update</button>
                            </form>
                        </div>
                        <p className='text-center mt-4'>
                            <NavLink to='/' className='text-success'>Back to Home</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Edit;