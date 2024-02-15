import React from 'react';
import { FaX } from 'react-icons/fa6';
import InvalidValueField from './InvalidValueField';

const ImageUploader = ({ preview, setPreview, imgFile, setImgFile, handleFileChange, imgFileError }) => {
  return (
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
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
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
      {imgFileError && <InvalidValueField />}
    </div>
  );
};

export default ImageUploader;
