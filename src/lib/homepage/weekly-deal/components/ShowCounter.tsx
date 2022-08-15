/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import DateTimeDisplay from './DateTimeDisplay';

type Props = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const ShowCounter = ({ days, hours, minutes, seconds }: Props) => {
  return (
    <div className="flex flex-row items-center justify-center p-2 text-4xl font-bold text-[#111]">
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      <p className="pb-10">:</p>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <p className="pb-10">:</p>
      <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      <p className="pb-10">:</p>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
