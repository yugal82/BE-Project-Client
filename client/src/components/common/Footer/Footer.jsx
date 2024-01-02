import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='w-full p-12 sm:py-16 sm:px-24 text-white md:flex md:items-center md:justify-between border-t border-white'>
            <div className=''>
                <div className='sm:flex sm:items-center'>
                    <span className='block text-3xl font-medium'>DeKrypt</span>
                    <span className='block sm:ml-2 font-medium text-sm md:text-lg'>&copy;All rights reserved. 2024</span>
                </div>
                <div className='text-gray-300'>
                    <small>This is a final year (BE) Computer Engineering project.</small>
                </div>
            </div>
            <div className='mt-8'>
                <div className='flex items-center justify-start md:justify-end text-white text-2xl'>
                    <FaXTwitter className='hover:scale-110 transition ease-in-out duration-200 cursor-pointer mx-4' />
                    <FaDiscord className='hover:scale-110 transition ease-in-out duration-200 cursor-pointer mx-4' />
                    <FaInstagram className='hover:scale-110 transition ease-in-out duration-200 cursor-pointer mx-4' />
                </div>
                <div className='mt-2'>
                    <ul className='text-sm md:text-lg md:flex md:items-center md:justify-between'>
                        <Link to='/'>
                            <li className='px-1 py-2 sm:py-0 smmd:px-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-200'>Home</li>
                        </Link>
                        <Link to='/nft-marketplace'>
                            <li className='px-1 py-2 sm:py-0 sm:px-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-200'>NFTs</li>
                        </Link>
                        <Link to='/crowdfunding'>
                            <li className='px-1 py-2 sm:py-0 sm:px-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-200'>Crowdfunding</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;
