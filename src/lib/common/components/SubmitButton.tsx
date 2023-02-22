import type { FormEvent } from "react";
import React from "react";

const SubmitButton = ({
  title,
  loading,
  handleClick,
}: {
  title: string;
  loading: boolean;
  handleClick?: (e: FormEvent<Element>) => Promise<void>;
}) => {
  return (
    <button
      type="submit"
      name={title}
      disabled={loading}
      onClick={handleClick}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${
        loading
          ? "bg-[rgb(221 229 244, 0.5)] !font-bold !text-black"
          : "bg-[#3e4684] text-white"
      } btn w-full rounded-3xl`}
    >
      {loading ? "Loading..." : title}
    </button>
  );
};

export default SubmitButton;
