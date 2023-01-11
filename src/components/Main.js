import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from './Details';
import Edit from './Edit';
import Header from './Header';
import Home from './Home';

const Main = () => {
    return (
        <>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/edit/:id' element={<Edit />} />
        </Routes>
        </>
    );
};

export default Main;