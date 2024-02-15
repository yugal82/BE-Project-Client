import React, { useRef, useState } from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import PropertiesComponent from './PropertiesComponent';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import ImageUploader from './ImageUploader';
import InvalidValueField from './InvalidValueField';
import InputField from './InputField';
import InputLabel from './InputLabel';
import LoadingAnimation from '../../common/LoadingAnimation';
import ErrorPopup from '../../common/popup/ErrorPopup';
import SuccessPopup from '../../common/popup/SuccessPopup';
import { GrAdd } from 'react-icons/gr';
import { HiOutlineMinus } from 'react-icons/hi';
import { useAddress } from '@thirdweb-dev/react';
import { createToken, uploadImgToIPFS, uploadJsonMetadataToIPFS } from '../../../api/nft-marketplace-api';
import { useNavigate } from 'react-router-dom';

const NFTCreate = () => {
  const address = useAddress();
  const navigate = useNavigate();

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
  const [txnError, setTxnError] = useState(false);
  const [txnErrorMsg, setTxnErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

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
      if (imageIPFS?.code === 200) {
        uri = await uploadJsonMetadataToIPFS(
          itemNameRef,
          externalLinkRef,
          descriptionRef,
          properties,
          imageIPFS?.imageIPFS
        );
      } else {
        setIsLoading(false);
        setTxnError(true);
        setTxnErrorMsg('Error while uploading metadata to IPFS. Please try again.');
      }

      // now mint NFT using smart contract function.
      if (imageIPFS?.code === 200 && uri?.code === 200) {
        const res = await createToken(uri?.uri, priceRef.current.value, address);
        if (res?.status === 'success') {
          setIsLoading(false);
          setSuccess(true);
        } else {
          setIsLoading(false);
          if (res?.code === 4001) {
            setTxnError(true);
            setTxnErrorMsg('You denied transaction. Please approve the transaction in your wallet when you try again.');
          }
        }
      } else {
        setTxnError(true);
        setTxnErrorMsg('Something went wrong. Please try again');
      }

      resetForm();
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
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
      {isLoading && <LoadingAnimation />}
      {txnError && <ErrorPopup message={txnErrorMsg} />}
      {success && <SuccessPopup message={'Your token was minted successfully! Visit profile to view your NFT.'} />}
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <h2 className="text-3xl font-semibold">Create a new NFT</h2>
        <span>
          <span className="text-red-700">*</span> Required fields
        </span>
      </div>
      <div className="pt-4 pb-12 px-8">
        <form onSubmit={(e) => handleFormSubmit(e)} className="w-full">
          <ImageUploader
            preview={preview}
            setPreview={setPreview}
            imgFile={imgFile}
            setImgFile={setImgFile}
            handleFileChange={handleFileChange}
            imgFileError={imgFileError}
          />
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 mt-6">
            <div className="">
              <InputLabel htmlFor={'item-name'} title={'Item Name'} isRequired={true} />
              <div className="w-full">
                <InputField
                  reference={itemNameRef}
                  type={'text'}
                  name={'item-name'}
                  placeholder={'Enter name of the NFT'}
                />
              </div>
              {itemNameError && <InvalidValueField />}
            </div>
            <div className="mt-3 sm:mt-0">
              <InputLabel htmlFor={'external-link'} title={'External Link'} isRequired={false} />
              <div className="w-full">
                <InputField
                  reference={externalLinkRef}
                  type={'text'}
                  name={'external-link'}
                  placeholder={'External Link'}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0">
              <InputLabel htmlFor={'price'} title={'Price'} isRequired={true} />
              <div className="w-full">
                <InputField reference={priceRef} type={'number'} name={'price'} placeholder={'Price'} />
              </div>
              {priceError && <InvalidValueField />}
            </div>
          </div>
          <div className="w-full mt-6">
            <InputLabel htmlFor={'description'} title={'Description'} isRequired={true} />
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
            {descError && <InvalidValueField />}
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
