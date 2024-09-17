'use client';

import AddToCart from '@/components/AddToCart';
import CartList from '@/components/CartList';
import RemoveFromCart from '@/components/RemoveFromCart';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';

type Tproducts = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: [string];
};

type TselectedProduct = {
  id: number;
  image: string;
  title: string;
};

const Products = () => {
  const [productsData, setProductsData] = useState<Tproducts[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [cartData, setCartData] = useState<TselectedProduct[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // data fetching
  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data;
      setProductsData(data.products);
      setLoading(false);
    };

    dataFetch();
  }, []);

  // add to cart button
  const addToCartHandler = (product: Tproducts) => {
    setCartData((prev) => [
      ...prev,
      { id: product.id, image: product.images[0], title: product.title },
    ]);
  };

  // removing product from cart button
  const removeFromCartHandler = (productId: number) => {
    setCartData((prev) => prev.filter((item) => item.id !== productId));
  };

  // cart count
  useEffect(() => {
    const cartListElement = document.querySelector('.eco_cart_list');
    if (cartListElement) {
      cartListElement.textContent = `${cartData.length}`;
    }
  }, [cartData.length]);

  // cart list open
  const onCartListHandler = () => {
    const body = document.querySelector('body');
    body?.classList.add('cart_opened');
    setCartOpen(true);
  };

  return (
    <>
      <div className="eco_section">
        <div className="eco_container">
          <div className="eco_wrapper flex flex-row justify-center gap-4 relative">
            <div className="w-full h-full flex flex-col items-center justify-start gap-10 max-[767px]:gap-6">
              <h1 className="text-4xl max-[767px]:text-[32px]">Best Sellers</h1>
              <div className="w-full h-full flex flex-wrap justify-center gap-10">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  productsData?.map((product) => {
                    const isInCart = cartData.some(
                      (item) => item.id === product.id
                    );
                    return (
                      <div
                        key={product.id}
                        className="eco_product_card_ctn w-full max-w-[300px] h-[400px] p-6 rounded-md border-[1px] border-[#ffffff20] shadow-[0_20px_30px_#ffffff10] flex flex-col items-center justify-start cursor-pointer"
                      >
                        <div className="eco_image_ctn w-[240px] h-[200px] relative">
                          {imageLoading && (
                            <div className="absolute w-full h-full flex items-center justify-center">
                              <div className="eco_image_loading"></div>
                            </div>
                          )}
                          <Image
                            className="w-hull h-full max-w-[240px] max-h-[200px] object-contain object-center transition-all duration-[400ms] ease-out"
                            src={product.images[0]}
                            alt={product.title}
                            width={240}
                            height={200}
                            loading="eager"
                            priority
                            onLoad={() => setImageLoading(false)}
                          />
                        </div>
                        <p className="text-center mt-auto transition-all duration-[400ms] ease-out">
                          {product.title}
                        </p>
                        {isInCart ? (
                          <RemoveFromCart
                            onClick={() => removeFromCartHandler(product.id)}
                          />
                        ) : (
                          <AddToCart
                            onClick={() => addToCartHandler(product)}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="block">
              <button
                className="eco_cart_ctn w-10 h-10 flex items-center justify-center sticky right-0 top-[120px] ml-auto cursor-pointer"
                onClick={onCartListHandler}
              >
                <span className="eco_cart_list w-5 h-5 absolute top-[-2px] right-[-2px] bg-red-500 rounded-[50%] text-[10px] flex items-center justify-center"></span>
                <MdShoppingCart className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {cartOpen && <CartList setCartOpen={setCartOpen} cartData={cartData} />}
    </>
  );
};

export default Products;
