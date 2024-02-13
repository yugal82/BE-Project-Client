import React, { useRef, useState } from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import PropertiesComponent from './PropertiesComponent';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import { GrAdd } from 'react-icons/gr';
import { HiOutlineMinus } from 'react-icons/hi';
import { FaX } from 'react-icons/fa6';
import { useAddress } from '@thirdweb-dev/react';
import { createToken, uploadImgToIPFS, uploadJsonMetadataToIPFS } from '../../../api/nft-marketplace-api';
import LoadingAnimation from '../../common/LoadingAnimation';

const NFTCreate = () => {
  const address = useAddress();

  // states
  const [imgFile, setImgFile] = useState(null);
  const [itemNameError, setItemNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imgFileError, setImgFileError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [preview, setPreview] = useState(false);
  const [properties, setProperties] = useState([
    {
      trait: '',
      value: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // refs
  const itemNameRef = useRef('');
  const externalLinkRef = useRef('');
  const descriptionRef = useRef('');
  const priceRef = useRef();

  // form submission handling
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // check form validation
    if (!isValidItemName(itemNameRef.current.value)) setItemNameError(true);
    if (!isValidDesc(descriptionRef.current.value)) setDescError(true);
    if (!imgFile) setImgFileError(true);
    if (!priceRef.current.value) setPriceError(true);

    // if all input filled, then create a new NFT.
    if (isValidDesc(descriptionRef.current.value) && isValidItemName(itemNameRef.current.value) && imgFile) {
      setIsLoading(true);

      // function call to upload the image to IPFS.
      const imageIPFS = await uploadImgToIPFS(imgFile);

      // upload metadata with image URI to IPFS.
      let uri;
      if (imageIPFS?.IpfsHash) {
        const nftMetadataJson = {
          itemName: itemNameRef.current.value,
          externalLink: externalLinkRef.current.value,
          description: descriptionRef.current.value,
          attributes: properties,
          image: `https://ipfs.io/ipfs/${imageIPFS?.IpfsHash}`,
        };

        uri = await uploadJsonMetadataToIPFS(nftMetadataJson);
      } else {
        setIsLoading(false);
        alert('Error while uploading image to IPFS');
        // change this error message and alert to a popup for better user experience.
      }

      // now mint NFT using smart contract function.
      const res = await createToken(uri, priceRef.current.value, address);
      console.log(res);
      if (res?.status == 'success') {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        if (res?.code === 4001) alert('User denied transaction');
      }
      resetForm();
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target?.files) {
      setPreview(true);
      setImgFile(e.target.files[0]);
      setImgFileError(false);
    }
  };

  const resetForm = () => {
    // set error states to false
    setItemNameError(false);
    setDescError(false);
    setImgFileError(false);
    setPriceError(false);
    setPreview(false);

    // reset the values after the form is submitted.
    itemNameRef.current.value = '';
    descriptionRef.current.value = '';
    externalLinkRef.current.value = '';
    priceRef.current.value = '';

    // reset the properties
    setProperties([{ trait: '', value: '' }]);
  };

  const isValidItemName = (inputString) => (inputString === '' ? false : true);
  const isValidDesc = (inputString) => (inputString === '' ? false : true);

  const handlePropertyAdd = (e) => {
    e.preventDefault();
    setProperties([...properties, { trait: '', value: '' }]);
  };

  const handlePropertyRemove = (e) => {
    e.preventDefault();
    if (properties.length <= 1) {
      alert('Atleast one property');
      return;
    }
    const currentTraits = [...properties];
    currentTraits.pop();
    setProperties(currentTraits);
  };

  const onPropertyChange = (e, index) => {
    const currentProperties = [...properties];
    currentProperties[index][e.target.name] = e.target.value;
    setProperties(currentProperties);
  };

  return (
    <div className="">
      {!address && <ConnectWalletPopup />}
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <h2 className="text-3xl font-semibold">Create a new NFT</h2>
        <span>
          <span className="text-red-700">*</span> Required fields
        </span>
      </div>
      <div className="pt-4 pb-12 px-8">
        {isLoading && <LoadingAnimation />}
        <form onSubmit={(e) => handleFormSubmit(e)} className="w-full">
          <div>
            <span className="text-white">
              Upload media <span className="text-red-700">*</span>
            </span>
            <div
              className={`relative p-4 mt-2 flex items-center justify-center text-white border-2 border-gray-300 border-dashed rounded-lg`}
            >
              {preview && (
                <div className="absolute top-2 right-2 cursor-pointer">
                  <FaX
                    onClick={() => {
                      setImgFile();
                      setPreview(false);
                    }}
                  />
                </div>
              )}
              {!preview && (
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
                    <label htmlFor="file-upload" className="cursor-pointer rounded-md font-medium">
                      <span className="">Upload a file</span>
                      <input
                        onChange={(e) => handleFileChange(e)}
                        id="file-upload"
                        name="fileUpload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">&nbsp;or drag and drop</p>
                  </div>
                  <small className="text-gray-300">Supported file types - PNG, JPG.</small>
                </div>
              )}
              {preview && (
                <div className="p-2">
                  <img className=" max-h-64 rounded-lg" src={URL.createObjectURL(imgFile)} alt="" />
                </div>
              )}
            </div>
            {imgFileError && (
              <span className="text-red-700 font-semibold text-xs">
                Please fill this input field before submitting the form
              </span>
            )}
          </div>
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-6">
            <div className="">
              <label className="text-white" htmlFor="item-name">
                Item Name <span className="text-red-700">*</span>
              </label>
              <div className="w-full">
                <input
                  ref={itemNameRef}
                  className="w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg"
                  type="text"
                  name="item-name"
                  placeholder="Enter name of the NFT"
                />
              </div>
              {itemNameError && (
                <span className="text-red-700 font-semibold text-xs">
                  Please fill this input field before submitting the form
                </span>
              )}
            </div>
            <div className="mt-3 sm:mt-0">
              <label className="text-white" htmlFor="external-link">
                External Link
              </label>
              <div className="w-full">
                <input
                  ref={externalLinkRef}
                  className="w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg"
                  type="text"
                  name="external-link"
                  placeholder="External Link"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0">
              <label className="text-white" htmlFor="external-link">
                Price <small className="text-gray-400">(in ETH)</small> <span className="text-red-700">*</span>
              </label>
              <div className="w-full">
                <input
                  ref={priceRef}
                  className="w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg"
                  type="number"
                  name="price"
                  placeholder="Price"
                />
              </div>
              {priceError && (
                <span className="text-red-700 font-semibold text-xs">
                  Please fill this input field before submitting the form
                </span>
              )}
            </div>
          </div>
          <div className="w-full mt-6">
            <label className="text-white" htmlFor="description">
              Description <span className="text-red-700">*</span>
            </label>
            <p className="text-sm text-gray-500">
              The description will be included on the items detail page underneath its image. Markdown syntax is
              supported.
            </p>
            <textarea
              ref={descriptionRef}
              className="w-full mt-2 p-2 text-white bg-transparent rounded-lg border border-gray-300 outline-none resize-none"
              name="description"
              cols="30"
              rows={5}
              placeholder="Description"
            ></textarea>
            {descError && (
              <span className="text-red-700 font-semibold text-xs">
                Please fill this input field before submitting the form
              </span>
            )}
          </div>
          <div className="mt-6">
            <span className="text-white block">Properties</span>
            <small className="text-gray-500 block">Traits you can use to Describe your NFT</small>
            {properties?.map((property, index) => (
              <PropertiesComponent property={property} index={index} key={index} onPropertyChange={onPropertyChange} />
            ))}

            <div className="flex items-center mt-4">
              <button
                onClick={(e) => handlePropertyAdd(e)}
                type="button"
                className="text-white text-3xl mx-1 hover:scale-110 transition-all ease-in-out duration-200"
              >
                <GrAdd />
              </button>
              <button
                onClick={(e) => handlePropertyRemove(e)}
                type="button"
                className="text-white text-3xl mx-1 hover:scale-110 transition-all ease-in-out duration-200"
              >
                <HiOutlineMinus />
              </button>
            </div>
          </div>
          <div className="w-full mt-10 flex items-center">
            <button
              type="submit"
              className="text-white bg-[#1d4ed8] py-2 px-6 rounded-lg font-semibold hover:scale-110 transition-all ease-in-out duration-200"
            >
              Create NFT
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default NFTCreate;
