import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './header.css';

function Header() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

    return (
         <div className='flex bg-gray-700 justify-center items-center p-4 text-white'>
            <div className='w-3/4 flex justify-center' style={{ marginLeft: '180px' }}>
                 <i className="fas fa-medkit" style={{ fontSize: '24px', width: '24px', height: '24px', color: 'red', marginRight:'1%', marginTop: '0.5%' , paddingTop: '6px'}}></i>
                   <div className='animation'></div>
                 <i className="fas fa-medkit" style={{ fontSize: '24px', width: '24px', height: '24px', color: 'red', marginLeft:'1%', marginTop: '0.5%' , paddingTop: '6px'}}></i>
           </div>
                <ul className='flex'>
                    <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                        <Link to="/">Main</Link>
                    </li>
                    <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                        <Link to="/rezultate">Cautare utilizator</Link>
                    </li>
                    <li className='px-4 cursor-pointer capitalize hover:scale-105 duration-200'>
                        <Link to="/info">Detalii BPM</Link>
                    </li>
                </ul>
            </div>
    )
}

export default Header
