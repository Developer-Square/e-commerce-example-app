/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

type Props = {
  value: number;
  type: string;
  isDanger: boolean;
};

const DateTimeDisplay = ({ value, type, isDanger }: Props) => {
  return (
    <div
      className={`${
        isDanger ? 'danger countdown' : 'countdown'
      } mx-5 flex flex-col`}
    >
      <p className="h-auto before:content-none">{value}</p>
      <span className="h-auto text-sm font-normal before:content-none">
        {type}
      </span>
    </div>
  );
};

export default DateTimeDisplay;
