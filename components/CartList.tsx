import Image from 'next/image';
import React from 'react';
import { CgClose } from 'react-icons/cg';

type TselectedProduct = {
  id: number;
  image: string;
  title: string;
};
type TcartProps = {
  setCartOpen: (open: boolean) => void;
  cartData: TselectedProduct[];
};

const CartList = ({ setCartOpen, cartData }: TcartProps) => {
  // cart list close button
  const onCartCloseHandler = () => {
    const body = document.querySelector('body');
    body?.classList.remove('cart_opened');
    setCartOpen(false);
  };

  return (
    <>
      <div className="fixed w-full h-full px-4 bg-[#21212199] top-0 z-[10001] flex items-center justify-center">
        <button
          className="w-10 h-10 absolute top-4 right-4 flex items-center justify-center"
          onClick={onCartCloseHandler}
        >
          <CgClose className="w-8 h-8" />
        </button>
        <div className="w-[500px] h-[600px] bg-[#212121f2] shadow-[0_20px_30px_#ffffff10] rounded-lg p-4 flex flex-col gap-3 overflow-auto">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div
                key={item.id}
                className="w-full py-2 px-4 bg-[#414141] rounded-lg flex items-center justify-start gap-3 cursor-pointer"
              >
                <div className="w-[80px] h-[80px] flex items-center justify-center">
                  <Image
                    className="w-full h-full object-contain object-center"
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    loading="eager"
                    priority
                  />
                </div>
                <p>{item.title}</p>
              </div>
            ))
          ) : (
            <div className="text-center px-4 py-6 text-[24px] leading-[36px]">
              Your Cart is empty
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartList;
