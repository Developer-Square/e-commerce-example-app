import React from "react";

type Props = {
  title: string;
};

const TextInput = ({ title }: Props) => {
  return (
    <div className="form-control w-full pb-5 text-sm">
      <label className="label">
        <span>
          {title}
          <span className="text-[#e53637]">*</span>
        </span>
      </label>
      <input
        type={`${title.includes("password") ? "password" : "text"}`}
        required
        placeholder={`${title}`}
        className="input-bordered input w-full bg-transparent"
      />
      {title === "Address" ? (
        <input
          type="text"
          placeholder="Apartment, suite, unite etc."
          className="input-bordered input mt-5 w-full bg-transparent"
        />
      ) : null}
    </div>
  );
};

export default TextInput;
