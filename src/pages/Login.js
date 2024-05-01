import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [isShowPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icons" />
          </div>

          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="email">Email: </label>

              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="enter email"
                  value={data.email}
                  onChange={handleOnChange}
                  id="email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password: </label>

              <div className="bg-slate-100 p-2 flex justify-between items-center ">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  placeholder="enter password"
                  value={data.password}
                  onChange={handleOnChange}
                  id="password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => {
                    setShowPassword(!isShowPassword);
                  }}
                >
                  <span>{isShowPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <Link
                to={"/forgot-password"}
                className="block w-fit pt-1 ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 rounded-full w-full mx-auto max-w-[120px] hover:scale-105 transition-all block mt-4 hover:bg-red-800">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
