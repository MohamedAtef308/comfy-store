import React from "react";

const TextInput = ({
  placeholder = "",
  name,
  defaultValue = "",
  type = "text",
  label = false,
  size = "",
}) => {
  return (
    <div className="form-control">
      <label className="form-control w-full max-w-xs">
        <div className="label capitalize">
          {label && <span className="label-text">{label}</span>}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered ${size}`}
        />
      </label>
    </div>
  );
};

export default TextInput;
