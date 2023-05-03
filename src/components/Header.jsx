import React from 'react'
import { Link } from "react-router-dom";
import './header.css';

function Header() {


    return (
        <div className='w-full flex bg-gray-700 justify-center items-center p-4 text-white'>
           <div className='w-3/4 flex justify-center' style={{ marginLeft: '350px' }}>
                <h1 className='text-3xl font-bold'>Health Monitor Web App</h1>
            </div>
            <div className='w-1/4 flex justify-end'>
                <ul className='flex'>
                    <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                        <Link to="/">Main</Link>
                    </li>
                    <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                        <Link to="/rezultate">Cautare utilizator</Link>
                    </li>
                </ul>
            </div>
        </div>  
    )
}

export default Header
