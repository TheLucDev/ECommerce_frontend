import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getProduct.url);

    const dataResponse = await response.json();
    console.log(dataResponse, 'dataResponse');

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  console.log(allProduct, 'allProduct');
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="border-2 border-red-600 text-red-600 transition-all hover:bg-red-600 hover:text-white py-1 px-3 rounded-full cursor-pointer"
        >
          Upload Product
        </button>
      </div>

      {/* all product */}
      <div className="flex flex-wrap gap-5 py-4 max-h-[calc(100vh-190px)] overflow-y-scroll ">
        {allProduct.map((product, index) => {
          return (
            <>
              <AdminProductCard
                data={product}
                key={index + 'allProduct'}
                fetchdata={fetchAllProduct}
              />
              <AdminProductCard
                data={product}
                key={index + 'allProduct'}
                fetchdata={fetchAllProduct}
              />
              <AdminProductCard
                data={product}
                key={index + 'allProduct'}
                fetchdata={fetchAllProduct}
              />
            </>
          );
        })}
      </div>
      {/* upload product components */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProduct;
