// here all the functions related to functionality such as posting data to IPFS, minting NFTs, listing NFTs for sale, buying NFTs, etc will be defined and exported here.

import axios from 'axios';
import { pinataAPIKey, pinataAPISecret, pinataJWT } from '../utils/constants';
const pinata_jwt = `Bearer ${pinataJWT}`;

export const uploadImgToIPFS = async (image) => {
  const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const data = new FormData();
  data.append('fileUpload', data);

  try {
    const res = await axios.post(pinataUrl, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        Authorization: pinata_jwt,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadJsonMetadataToIPFS = async (jsonData) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const metadata = JSON.stringify(jsonData);

  try {
    const response = await axios.post(url, metadata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: pinata_jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
