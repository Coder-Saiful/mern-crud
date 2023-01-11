import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='mb-5'>
                <NavLink to='/' className='text-decoration-none text-dark'>
                    <h2 className='text-center bg-body-secondary py-3 mb-0'>MERN CRUD APP</h2>
                </NavLink>
        </header>
    );
};

export default Header;