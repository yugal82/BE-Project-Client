import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';

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
