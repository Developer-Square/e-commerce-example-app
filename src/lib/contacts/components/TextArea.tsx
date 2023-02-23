import React from "react";

const TextArea = ({ title }: { title: string }) => {
  return (
    <div className="form-control text-sm">
      <label className="label">
        <span>
          {title}
          <span className="text-[#e53637]">*</span>
        </span>
      </label>
      <textarea
        className="textarea-bordered textarea h-24 bg-transparent"
        placeholder={title}
      ></textarea>
    </div>
  );
};

export default TextArea;
