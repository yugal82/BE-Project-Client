import React from 'react'

const NFTHero = () => {
    return (
        <div className='w-full py-12 sm:py-16 sm:px-24 text-white'>
            <div className='w-full flex-row items-center justify-center lg:flex lg:items-center lg:justify-around'>
                <div className='w-full px-12'>
                    <h2 className='text-4xl sm:text-5xl font-bold'>Explore, buy, sell, collect, and create NFTs</h2>
                    <p className='mt-2 text-gray-200 text-lg text-left'>Unleash your imagination by exploring, creating, buying, and selling your unique NFTs on our marketplace</p>
                </div>
                <div className="mt-8 sm:mt-0 w-full flex items-center justify-center">
                    <img className='w-80 rounded-3xl' src="./assets/NFT-Marketplace-Banner.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default NFTHero;
