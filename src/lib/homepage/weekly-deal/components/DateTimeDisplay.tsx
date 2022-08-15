/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

type Props = {
  value: number;
  type: string;
  isDanger: boolean;
};

const DateTimeDisplay = ({ value, type, isDanger }: Props) => {
  return (
    <div className={isDanger ? 'danger countdown' : 'countdown'}>
      <p className="before:content-none">{value}</p>
      <span className="before:content-none">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
