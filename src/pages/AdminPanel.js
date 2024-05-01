import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-100px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center ">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* navigation */}
        <div>
          <nav className="grid">
            <Link to={"all-user"} className="p-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-product"} className="p-2 py-1 hover:bg-slate-100">
              Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
