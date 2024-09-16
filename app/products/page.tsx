'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Tproducts = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: [string];
};

const Products = () => {
  const [productsData, setProductsData] = useState<Tproducts[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data;
      setProductsData(data.products);
      setLoading(false);
    };

    dataFetch();
  }, []);

  return (
    <>
      <div className="eco_section">
        <div className="eco_container">
          <div className="eco_wrapper flex flex-col justify-start items-center gap-10">
            <h1 className="text-4xl">Best Sellers</h1>
            <div className="w-full h-full flex flex-wrap justify-center gap-10">
              {loading ? (
                <>
                  <div className="text-center">Loading...</div>
                </>
              ) : (
                <>
                  {productsData?.map((product) => {
                    return (
                      <>
                        <div className="w-full max-w-[300px] h-[400px] p-6 rounded-md border-[1px] border-[#ffffff20] shadow-[0_20px_30px_#ffffff10] flex flex-col items-center justify-start">
                          <div className="w-[240px] h-[200px] relative">
                            {imageLoading && (
                              <>
                                <div className="absolute w-full h-full flex items-center justify-center">
                                  <div className="eco_image_loading"></div>
                                </div>
                              </>
                            )}
                            <Image
                              className="w-[240px] h-[200px] object-contain object-center"
                              src={product.images[0]}
                              alt={product.title}
                              width={240}
                              height={200}
                              onLoad={() => setImageLoading(false)}
                            />
                          </div>
                          <p className="text-center mt-auto">{product.title}</p>
                          <button className="w-full rounded-lg py-4 px-6 border-[1px] border-[#ffffff60] mt-auto hover:bg-[#ffffff10] active:bg-[#ffffff20] transition-all">
                            Add to Cart
                          </button>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
