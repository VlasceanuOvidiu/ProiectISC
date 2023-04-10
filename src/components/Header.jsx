import React from 'react'
import { Link } from "react-router-dom";

function Header() {


    return (
        <div className='flex bg-gray-700 w-full justify-between items-center p-4 text-white'>
            <div>
                <h1 className='text-3xl font-bold'>Proiect</h1>
            </div>
            <ul className='flex'>
                <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                    <Link to="/">Introducere</Link>
                </li>
                <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                    <Link to="/rezultate">Rezultate</Link>
                </li>

            </ul>



        </div>
    )
}

export default Header