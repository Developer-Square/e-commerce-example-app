import React from 'react';

const SubmitButton = ({ title }: { title: string }) => {
  return (
    <button
      type="submit"
      name={title}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="btn w-full rounded-3xl bg-[#3e4684]"
    >
      {title}
    </button>
  );
};

export default SubmitButton;
