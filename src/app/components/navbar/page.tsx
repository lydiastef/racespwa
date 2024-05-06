'use client'
import './style.css'
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='nav1'>
      {/* Navbar content */}
        <Link href='/'>
        <div className='logodiv'>
            <img className='logo' src='/Logo.webp' />
            <p className='logop'>Euro Races</p>
        </div>
        </Link>
      {/* Add other navigation links or elements here */}
    </nav>
  )
}
export default Navbar;