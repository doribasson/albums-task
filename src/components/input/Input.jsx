import React from "react";
import "./input.scss";

function Input({ onChange, placeholder, type }) {
  return (
    <div className="o-inputgroup">
      <input
        placeholder={placeholder}
        type={type}
        className="o-input"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
