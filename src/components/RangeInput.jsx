import React, { useState } from "react";
import {formatPrice} from "../utils";

const RangeInput = ({ label, name, size, defaultValue=null }) => {
  const step = 1000;
  const max = step * 100;
  const [selectedPrice, setSelectedPrice] = useState(defaultValue || max);

  const handleRangeChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>

      <input
        type="range"
        name={name}
        id={name}
        min={0}
        max={max}
        step={step}
        onChange={handleRangeChange}
        value={selectedPrice}
        className={`range range-primary ${size}`}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max: {formatPrice(max)}</span>
      </div>
    </div>
  );
};

export default RangeInput;
