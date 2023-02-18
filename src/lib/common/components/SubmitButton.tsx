import React from "react";

const SubmitButton = ({
  title,
  loading,
}: {
  title: string;
  loading: boolean;
}) => {
  return (
    <button
      type="submit"
      name={title}
      disabled={loading}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`${
        loading
          ? "bg-[rgb(221 229 244, 0.5)] !font-bold !text-black"
          : "bg-[#3e4684]"
      } btn w-full rounded-3xl`}
    >
      {loading ? "Loading..." : title}
    </button>
  );
};

export default SubmitButton;
