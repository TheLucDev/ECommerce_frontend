import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import { displayUSDCurrency } from '../helpers/displayCurrency';
const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded max-h-[280px]">
      <div className="w-40">
        <img
          className="mx-auto w-fit"
          src={data?.productImage[0]}
          width={120}
          height={120}
          alt=""
        />
        <h1 className="">{data.productName} </h1>
        <div>
          <b>{displayUSDCurrency(data.sellingPrice)}</b>
          <div
            onClick={() => {
              setEditProduct(true);
            }}
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full  hover:text-white cursor-pointer"
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <div>
          <AdminEditProduct
            productData={data}
            onClose={() => {
              setEditProduct(false);
            }}
            fetchdata={fetchdata}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;
