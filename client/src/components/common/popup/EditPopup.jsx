import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
import { FaX } from 'react-icons/fa6';
import { convertImageToBase64 } from '../../../utils';
import { updateUserInfo } from '../../../api/nft-marketplace-api';

const EditPopup = ({ setIsEditPopupOpen, address, setIsUpdateLoading, setSuccess }) => {
  let [isOpen, setIsOpen] = useState(true);
  const [bannerPreview, setBannerPreview] = useState(false);
  const [bannerImgFile, setBannerImgFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(false);
  const [profileImgFile, setProfileImgFile] = useState(null);

  const usernameRef = useRef('');
  const bioRef = useRef('');

  const onBannerFileChange = (e) => {
    e.preventDefault();
    if (e.target?.files) {
      setBannerPreview(true);
      setBannerImgFile(e.target.files[0]);
    }
  };

  const onProfileFileChange = (e) => {
    e.preventDefault();
    if (e.target?.files) {
      setProfilePreview(true);
      setProfileImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    let userData = {};
    let banner64;
    let profile64;
    if (bannerImgFile) {
      banner64 = await convertImageToBase64(bannerImgFile);
      userData.bannerImage = banner64;
    }
    if (profileImgFile) {
      profile64 = await convertImageToBase64(profileImgFile);
      userData.profileImage = profile64;
    }
    if (usernameRef.current.value !== '') {
      userData.name = usernameRef.current.value;
    }
    if (bioRef.current.value !== '') {
      userData.bio = bioRef.current.value;
    }

    const res = await updateUserInfo(userData, address);
    if (res?.status === 200) {
      setSuccess(true);
      window.location.reload();
    } else {
      alert('Something went wrong. Please try again');
    }
    setIsEditPopupOpen(false);
    setIsUpdateLoading(false);

    resetForm();
  };

  const resetForm = () => {
    usernameRef.current.value = '';
    bioRef.current.value = '';
    setProfilePreview(false);
    setBannerPreview(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditPopupOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#eee] bg-transparent backdrop-filter backdrop-blur-lg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="relative w-[80%] transform overflow-hidden rounded-2xl bg-[#111827] px-8 py-10 text-left align-middle shadow-lg shadow-gray-700 transition-all
                "
                >
                  <div className="absolute right-4 top-3 text-white">
                    <FaX className="w-3 cursor-pointer" onClick={closeModal} />
                  </div>
                  <Dialog.Title as="h3" className="w-full sm:text-lg font-semibold text-white">
                    Update your information
                  </Dialog.Title>
                  <div className="mt-6 text-white">
                    <div className="w-full">
                      <span className="text-sm">Banner Image</span>
                      <div
                        className={`relative p-4 flex items-center justify-center text-white border-2 border-gray-300 border-dashed rounded-lg`}
                      >
                        {bannerPreview && (
                          <div className="absolute top-2 right-2 cursor-pointer">
                            <FaX
                              onClick={() => {
                                setBannerImgFile();
                                setBannerPreview(false);
                              }}
                            />
                          </div>
                        )}
                        {!bannerPreview && (
                          <div className="space-y-1 text-center">
                            <div className="flex items-center justify-center text-base">
                              <label htmlFor="banner-file-upload" className="cursor-pointer rounded-md font-medium">
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
                                <input
                                  onChange={(e) => onBannerFileChange(e)}
                                  id="banner-file-upload"
                                  name="banner-file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                        {bannerPreview && (
                          <div className="p-2">
                            <img className="max-h-64 rounded-lg" src={URL.createObjectURL(bannerImgFile)} alt="" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <span className="text-sm">Profile Image</span>
                      <div
                        className={`relative w-36 flex items-center justify-center text-white border-2 border-gray-300 border-dashed rounded-lg`}
                      >
                        {profilePreview && (
                          <div className="absolute top-1 right-1 cursor-pointer">
                            <FaX
                              className="w-3 text-black"
                              onClick={() => {
                                setProfileImgFile();
                                setProfilePreview(false);
                              }}
                            />
                          </div>
                        )}
                        {!profilePreview && (
                          <div className="space-y-1 text-center">
                            <div className="flex items-center justify-center text-base">
                              <label htmlFor="profile-file-upload" className="cursor-pointer rounded-md font-medium">
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
                                <input
                                  onChange={(e) => onProfileFileChange(e)}
                                  id="profile-file-upload"
                                  name="profile-file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                />
                              </label>
                            </div>
                          </div>
                        )}
                        {profilePreview && (
                          <div className="">
                            <img className="w-full rounded-lg" src={URL.createObjectURL(profileImgFile)} alt="" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label className="text-sm">Username</label>
                      <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Enter your username"
                        className="w-full p-2 bg-transparent outline-none text-gray-300 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="w-full mt-4">
                      <label className="text-sm">Bio</label>
                      <textarea
                        ref={bioRef}
                        type="text"
                        placeholder="Tell us your story.."
                        rows={3}
                        className="w-full p-2 bg-transparent outline-none text-gray-300 border border-gray-300 rounded-lg resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm text-white bg-[#1d4ed8] font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditPopup;
