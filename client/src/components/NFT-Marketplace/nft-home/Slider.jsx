import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import NFTCard from '../../common/NFTCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const breakpoints = {
  360: {
    slidesPerView: 1,
  },
  540: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
};

const Slider = ({ address, marketListedTokens }) => {
  SwiperCore.use([Autoplay]);

  const comparePrices = (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  };

  useEffect(() => {
    if (marketListedTokens) {
      marketListedTokens?.sort(comparePrices);
      marketListedTokens = marketListedTokens?.slice(0, 5);
    }
  }, [marketListedTokens]);

  return (
    <div className="relative">
      <div className="nextEl hidden lg:block absolute top-[40%] -right-14">
        <FaAngleRight className="w-full h-12 cursor-pointer text-white" />
      </div>
      <div className="prevEl hidden lg:block absolute top-[40%] -left-14">
        <FaAngleLeft className="w-full h-12 cursor-pointer text-white" />
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: '.nextEl',
          prevEl: '.prevEl',
        }}
        modules={[Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {marketListedTokens?.map((nft) => (
          <SwiperSlide key={nft?.tokenId}>
            <NFTCard nft={nft} address={address} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
