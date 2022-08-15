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
    <div className="">
      <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

export default ShowCounter;
