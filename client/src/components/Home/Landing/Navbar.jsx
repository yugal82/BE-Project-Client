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
            <div className='w-full sm:py-1 sm:flex sm:items-center sm:justify-around bg-gray-900 text-white sm:mt-10 sm:rounded-3xl'>
                <div className='font-semibold p-4 flex items-center justify-between'>
                    <span className='text-2xl sm:text-xl p-4 sm:px-0 sm:py-0'>DeKrypt</span>
                    {
                        menuOpen ?
                            <div className='sm:hidden text-white font-bold text-2xl px-4 cursor-pointer'><CgClose onClick={handleMenuClick} /></div>
                            :
                            <div className='sm:hidden text-white text-2xl px-4 cursor-pointer'><GiHamburgerMenu onClick={handleMenuClick} /></div>
                    }
                </div>
                {
                    menuOpen && <div className='absolute h-screen w-full bg-transparent backdrop-filter backdrop-blur-3xl border-t border-white sm:hidden'>
                        <div className='w-full flex text-center justify-center pt-6'>
                            <ul className='w-full text-black'>
                                <li className='w-full text-3xl font-semibold cursor-pointer py-4 border-b border-gray-900'>About us</li>
                                <Link to='/nft-marketplace'><li className='w-full text-3xl font-semibold cursor-pointer py-4 border-b border-gray-900'>NFT Marketplace</li></Link>
                                <Link to='/crowdfunding'><li className='w-full text-3xl font-semibold cursor-pointer py-4 border-b border-gray-900'>Crowdfunding</li></Link>
                            </ul>
                        </div>
                        <div className='w-full flex items-center justify-center mx-auto mt-12'>
                            <button className='text-3xl font-medium cursor-pointer text-white bg-gray-900 p-6 rounded-3xl'>Connect Wallet</button>
                        </div>
                    </div>
                }
                <div className='hidden sm:block'>
                    <ul className='flex items-center justify-center'>
                        <li className='text-base py-4 px-3 font-semibold cursor-pointer hover:underline'>About us</li>
                        <Link to='/nft-marketplace'><li className='text-base py-4 px-3 font-semibold cursor-pointer hover:underline'>NFT Marketplace</li></Link>
                        <Link to='/crowdfunding'><li className='text-base py-4 px-3 font-semibold cursor-pointer hover:underline'>Crowdfunding</li></Link>
                        <button type='btn' className='text-base p-3 font-semibold cursor-pointer bg-white text-gray-900 rounded-2xl ml-4 hover:underline'>Connect wallet</button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
