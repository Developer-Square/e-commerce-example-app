/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent) => void;
};

const TextBox = ({
  title,
  type,
  placeholder,
  value,
  required,
  onChange,
}: Props) => {
  return (
    <>
      {type === 'text' ? (
        <div className="mb-3 w-full rounded-3xl bg-white p-2">
          <label className="label pl-4 pb-0">{title}</label>
          <div className="flex items-center pl-4">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <input
              type="text"
              placeholder={placeholder}
              required={required}
              value={value}
              onChange={onChange}
              className="input-ghost input w-full max-w-xs pl-1 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="w-full rounded-3xl bg-white p-2">
          <label className="label pl-4 pb-0">{title}</label>
          <div className="flex items-center pl-4">
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            <input
              type="password"
              placeholder="***********"
              value={value}
              required={required ?? false}
              onChange={onChange}
              className="input-ghost input w-full max-w-xs pl-1 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TextBox;
