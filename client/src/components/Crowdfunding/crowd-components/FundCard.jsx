import React from 'react';

import { daysLeft } from '../../../utils';

import { TagType } from '../crowd-assets';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  return <div>FundCard</div>;
};

export default FundCard;
