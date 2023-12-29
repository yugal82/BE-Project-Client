import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='relative w-full sm:w-[85%] flex mx-auto'>
            <div className='w-full sm:py-1 sm:px-6 sm:flex sm:items-center sm:justify-between bg-white text-gray-900 sm:mt-10 sm:rounded-3xl'>
                <div className='font-semibold py-4 sm:py-0 flex items-center justify-between'>
                    <span className='text-3xl font-bold sm:text-xl p-4 sm:px-0 sm:py-0'>DeKrypt</span>
                    {
                        menuOpen ?
                            <div className='sm:hidden text-gray-900 font-bold text-3xl px-4 cursor-pointer'><CgClose onClick={handleMenuClick} /></div>
                            :
                            <div className='sm:hidden text-gray-900 font-bold text-3xl px-4 cursor-pointer'><GiHamburgerMenu onClick={handleMenuClick} /></div>
                    }
                </div>
                {
                    menuOpen && <div className='absolute h-screen w-full bg-transparent backdrop-filter backdrop-blur-3xl sm:hidden'>
                        <div className='w-full flex text-center justify-center pt-6'>
                            <ul className='w-full text-white'>
                                <li className='w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white'>About us</li>
                                <Link to='/nft-marketplace'><li className='w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white'>NFT Marketplace</li></Link>
                                <Link to='/crowdfunding'><li className='w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white'>Crowdfunding</li></Link>
                            </ul>
                        </div>
                        <div className='w-full flex items-center justify-center mx-auto mt-12'>
                            <button className='text-3xl font-medium cursor-pointer bg-blue-700 text-white p-6 rounded-3xl'>Connect Wallet</button>
                        </div>
                    </div>
                }
                <div className='hidden sm:block'>
                    <ul className='w-full flex items-center justify-between'>
                        <div className='flex items-center justify-center'>
                            <li className='text-base py-4 px-2 font-semibold cursor-pointer hover:underline'>About us</li>
                            <Link to='/nft-marketplace'><li className='text-base py-4 px-2 font-semibold cursor-pointer hover:underline'>NFT Marketplace</li></Link>
                            <Link to='/crowdfunding'><li className='text-base py-4 px-2 font-semibold cursor-pointer hover:underline'>Crowdfunding</li></Link>
                        </div>
                        <div className='ml-8'>
                            <button type='btn' className='text-base p-3 font-semibold cursor-pointer bg-blue-700 text-white rounded-2xl hover:underline'>Connect wallet</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
