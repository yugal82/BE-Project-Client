import { useAddress } from '@thirdweb-dev/react';
import React, { useEffect } from 'react'

const NFTHome = () => {
  const address  = useAddress()
  
  useEffect(() => {
    console.log(address);
  }, [])
  
  return (
    <div>NFTHome</div>
  )
}

export default NFTHome;
