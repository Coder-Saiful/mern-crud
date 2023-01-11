import { API } from "../utils/config";
import axios from 'axios';

export const createData = (data) => {
    return axios.post(`${API}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getData = () => {
    return axios.get(`${API}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getSingleData = id => {
    return axios.get(`${API}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const updateData = (id, data) => {
    return axios.put(`${API}/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const deleteData = id => {
    return axios.delete(`${API}/${id}`);
}