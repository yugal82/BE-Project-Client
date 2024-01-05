import React from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import { GrAdd } from "react-icons/gr";
import { HiOutlineMinus } from "react-icons/hi";
import PropertiesComponent from './PropertiesComponent';

const NFTCreate = () => {
  return (
    <div className=''>
      <NFTNavbar />
      <div className='w-full px-8 py-12 sm:py-16 text-white'>
        <h2 className='text-3xl font-semibold'>Create a new NFT</h2>
        <span><span className='text-red-700'>*</span> Required fields</span>
      </div>
      <div className='pt-4 pb-12 px-8'>
        <form onSubmit={() => { }} className='w-full'>
          <div>
            <span className='text-white'>Upload media <span className='text-red-700'>*</span></span>
            <div className='p-4 mt-2 flex items-center justify-center text-white border-2 border-gray-300 border-dashed rounded-lg'>
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex items-center justify-center text-base">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-md font-medium"
                  >
                    <span className=''>Upload a file</span>
                    <input
                      id="file-upload"
                      name="fileUpload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">&nbsp;or drag and drop</p>
                </div>
                <small className="text-gray-300">Supported file types - PNG, JPG, MP3, MP4.</small>
              </div>
            </div>

          </div>
          <div className='w-full py-4 grid grid-cols-2 gap-x-4 mt-6'>
            <div className=''>
              <label className='text-white' htmlFor="item-name">Item Name <span className='text-red-700'>*</span></label>
              <div className='w-full'>
                <input className='w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg' type="text" name="item-name" placeholder='Enter name of the NFT' />
              </div>
            </div>
            <div className=''>
              <label className='text-white' htmlFor="external-link">External Link</label>
              <div className='w-full'>
                <input className='w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg' type="text" name="external-link" placeholder='External Link' />
              </div>
            </div>
          </div>
          <div className='w-full mt-6'>
            <label className='text-white' htmlFor="description">Description <span className='text-red-700'>*</span></label>
            <p className="text-sm text-gray-500">
              The description will be included on the items detail page underneath its image.
              Markdown syntax is supported.
            </p>
            <textarea className='w-full mt-2 p-2 text-white bg-transparent rounded-lg border border-gray-300 outline-none resize-none' name="description" cols="30" rows={5} placeholder='Description'></textarea>
          </div>
          <div className='mt-6'>
            <span className='text-white block'>Properties</span>
            <small className='text-gray-500 block'>Traits you can use to Describe your NFT</small>
            <PropertiesComponent />

            {/* remove this later, this just to see how the UI looks with multiple components. */}
            <PropertiesComponent />
            <PropertiesComponent />

            <div className='flex items-center mt-4'>
              <button className='text-white text-3xl mx-1 hover:scale-110 transition-all ease-in-out duration-200'><GrAdd /></button>
              <button className='text-white text-3xl mx-1 hover:scale-110 transition-all ease-in-out duration-200'><HiOutlineMinus /></button>
            </div>
          </div>
          <div className='w-full mt-10 flex items-center'>
            <button className='text-white bg-[#1d4ed8] py-2 px-6 rounded-lg font-semibold hover:scale-110 transition-all ease-in-out duration-200'>Create NFT</button>
          </div>
        </form >
      </div>
      <Footer />
    </div >
  )
}

export default NFTCreate;
