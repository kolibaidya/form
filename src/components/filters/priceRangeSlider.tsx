import type { PriceRangeSliderProps } from "../types/priceRangeSliderProps";

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= value[1]) onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= value[0]) onChange([value[0], newMax]);
  };

  return (
    <div className="flex space-x-2">
      <input
        type="number"
        min={min}
        max={value[1]}
        value={value[0]}
        onChange={handleMinChange}
        className="border rounded p-1 w-1/2"
      />
      <input
        type="number"
        min={value[0]}
        max={max}
        value={value[1]}
        onChange={handleMaxChange}
        className="border rounded p-1 w-1/2"
      />
    </div>
  );
};
