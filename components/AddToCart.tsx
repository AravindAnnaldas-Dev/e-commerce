import React from "react";

const AddToCart = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        className="w-full rounded-lg py-4 px-6 border-[1px] border-[#ffffff60] mt-auto hover:bg-[#ffffff10] active:bg-[#ffffff20] transition-all"
        onClick={onClick}
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCart;
