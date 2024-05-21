import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
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
      {/* upload product components */}
      {!openUploadProduct && (
        <UploadProduct onClose={console.log("Upload Product")} />
      )}
    </div>
  );
};

export default AllProduct;
