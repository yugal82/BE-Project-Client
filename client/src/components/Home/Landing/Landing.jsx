import React from 'react'
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';

const Landing = () => {
  return (
    <div className='w-full bg-gray-900'>
        <div className='w-full'>
            <Navbar />
            <Hero />
            <Features />
        </div>
    </div>
  )
}

export default Landing;
