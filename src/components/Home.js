import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createData, deleteData, getData } from '../api/apiData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../utils/config';
import axios from 'axios';

const Home = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        disabled: false,
        error: false
    });

    const [data, setData] = useState([]);

    const {name, email, phone, disabled, error} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        setValues({
            ...values,
            disabled: true
        });
        
        axios.post(`${API}`, {name: name, email: email, phone: phone})
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    phone: '',
                    disabled: false,
                    error: false
                });
                showData();
                toast.success(`${response.data.message}`, {
                    autoClose: 3000
                });
            })
            .catch(err => {
                setValues({
                    ...values,
                    disabled: false
                });
            });
    }

    const showData = () => {
        axios.get(`${API}`)
        .then(response => {
            setData(response.data);
        });
    }

    const DataDelete = id => {
        axios.delete(`${API}/${id}`)
            .then(response => {
                showData();
                setTimeout(() => {
                    toast.success(`${response.data.message}`, {
                        autoClose: 3000
                    });
                }, 300);
            });
    }

    useEffect(() => {
        showData();
    }, []);

    return (
        <>
        <ToastContainer />
            
            <section className='container-fluid'>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="dataForm">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-center">Add Data</h2>
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
                            <button type="submit" className="btn btn-primary" disabled={disabled}>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="dataTable">
                            <h2 className="text-center">Data List</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => {
                                            return (
                                                <tr key={item._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td className='actionBtnGroup'>
                                                        <NavLink to={`/details/${item._id}`} className='details'>
                                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                                        </NavLink>
                                                        <NavLink to={`/edit/${item._id}`} className='edit'>
                                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                        </NavLink>
                                                        <span onClick={() => DataDelete(item._id)} className='delete'>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ): (
                                        <tr>
                                            <td colSpan='5'>
                                            <h4 className='text-center'>{data.message}</h4>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;