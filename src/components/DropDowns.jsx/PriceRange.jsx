const PriceRange = ({ priceRange, setPriceRange, min = 0, max = 50000 }) => {
  const [minValue, maxValue] = priceRange;
  console.log(priceRange);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setPriceRange([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setPriceRange([minValue, value]);
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      {/* Price display */}
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>₹{minValue}</span>
        <span>₹{maxValue}</span>
      </div>

      {/* Slider container */}
      <div className="relative h-4">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-300 rounded-full top-1/2 -translate-y-1/2" />

        {/* Selected range highlight */}
        <div
          className="absolute h-1.5 bg-green-500 rounded-full top-1/2 -translate-y-1/2"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-4 appearance-none bg-transparent z-10"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-4 appearance-none bg-transparent z-20"
        />
      </div>
    </div>
  );
};

export default PriceRange;
