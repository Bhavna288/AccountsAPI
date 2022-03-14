import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../styles/navbar.css';
import Dashboard from '@mui/icons-material/Dashboard';

const Navbar = () => {

    return (
        <div className="cust_navbar">
            <ul className='navlist'>
                <li className='nav-item'>
                    <Link to="/"><Dashboard />Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/sales">Sales</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/items">Items</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/clients">Clients</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;