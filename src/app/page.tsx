'use client'
import React from 'react';
import './style.css';
import Navbar from './components/navbar/page';
import Navbar2 from './components/navbar/navbar2/page';


const SimpleComponent: React.FC = () => {
  return (
    <>
      <Navbar />
      <Navbar2/>
      <div className='main'>
        <h1>Hello, welcome to this PWA project that finally seems to actually be working!</h1>
      </div>
    </>
  );
};

export default SimpleComponent;
