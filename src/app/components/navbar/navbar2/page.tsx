import './style.css'
import React from 'react';
import { useRouter } from 'next/navigation';


const Navbar: React.FC = () => {
  return (
    <nav className='nav2'>
      <div className='a-container'>
        <a className='a-item' href='pages/events'>Events</a>
        <a className='a-item' href=''>Blog</a>
        <a className='a-item' href=''>FAQ</a>
      </div>
    </nav>
  )
}
export default Navbar;