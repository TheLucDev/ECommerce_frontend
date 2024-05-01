import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

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

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataRes = await dataResponse.json();
      if (dataRes.success) {
        toast.success(dataRes.message);
        navigate("/login");
      }

      if (dataRes.error) {
        toast.error(dataRes.message);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data?.profilePic || loginIcon} alt="login icons" />
            </div>
            <form action="">
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-5 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="name">Name: </label>

              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="enter name"
                  value={data.name}
                  required="true"
                  onChange={handleOnChange}
                  id="name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="email">Email: </label>

              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  required="true"
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
                  required="true"
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
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password: </label>

              <div className="bg-slate-100 p-2 flex justify-between items-center ">
                <input
                  type={isShowConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="confirm password"
                  required="true"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  id="confirmPassword"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => {
                    setShowConfirmPassword(!isShowConfirmPassword);
                  }}
                >
                  <span>
                    {isShowConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 rounded-full w-full mx-auto max-w-[120px] hover:scale-105 transition-all block mt-4 hover:bg-red-800">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
