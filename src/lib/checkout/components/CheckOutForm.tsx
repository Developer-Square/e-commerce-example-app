import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import TextInput from './TextInput';

const CheckBoxComponent = ({
  title,
  type,
}: {
  title: string;
  type?: string;
}) => (
  <div className="form-control">
    <label className="label mb-4 cursor-pointer justify-start">
      <input type="checkbox" className="checkbox" />
      <span className="label-text ml-4">{title}</span>
    </label>
    {type === 'account' ? (
      <p className="mb-5 text-sm">
        Create an account by entering the information below. If you are a
        returning customer please login at the top of the page
      </p>
    ) : null}
  </div>
);

const CheckOutForm = () => {
  return (
    <div>
      <h6 className="mb-12 border-t-2 border-[#77b527] bg-[#f5f5f5] px-7 pt-6 pb-5 text-sm">
        <FontAwesomeIcon icon={faTag} className="mr-3" />
        Have a coupon?
        <a href="#"> Click here</a> to enter your code
      </h6>
      <h6 className="mb-7 border-b border-[#e1e1e1] pb-6 text-base font-bold uppercase">
        Billing Details
      </h6>
      <TextInput title="First Name" />
      <TextInput title="Last Name" />
      <TextInput title="Country" />
      <TextInput title="Address" />
      <TextInput title="Town/City" />
      <TextInput title="Country/State" />
      <TextInput title="Postcode/ZIP" />
      <TextInput title="Phone" />
      <TextInput title="Email" />
      <CheckBoxComponent title="Create an account" type="account" />
      <TextInput title="Account Password" />
      <CheckBoxComponent title="Note about your order, e.g, special note for delivery" />
      <TextInput title="Order Notes" />
    </div>
  );
};

export default CheckOutForm;
