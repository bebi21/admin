import React, { useState } from "react";
import publicAxios from "../config/publicAxios";
import checkPassword from "../validate/validate";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
// import  notifi vào
import openNotification from "../notification/notification";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // show password
  const handleShowPassword = () => {
    if (!show) {
      document.getElementById("password").type = "text";
    } else {
      document.getElementById("password").type = "password";
    }
    setShow(!show);
  };

  // Lấy giá trị  từ ô  input
  const handleTakeValue = (e) => {
    let { name, value } = e.target;
    value = value.replace(/\s+/g, "");
    setUser({ ...user, [name]: value });
  };
  // funciton để đăng nhậpk
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = checkPassword(user.password);
    console.log(result);
    // check input không được để trống
    if (user.username === "") {
      return openNotification({
        title: "warning",
        message: "Không được để trống tên Đăng Nhập",
      });
    }
    if (user.password === "") {
      return openNotification({
        title: "warning",
        message: "Không được để trống tên Mật Khẩu",
      });
    }
    // validate cho  password bằng regex
    if (!result) {
      setUser({ ...user, password: "" });
      return openNotification({
        title: "warning",
        message: "Mật  khẩu không đúng định dạng ",
      });
    }
    // bắt các res trả về từ server
    try {
      const responsi = await publicAxios.post(`/admin/login`, user);
      console.log(responsi);
      openNotification({
        title: "success",
        message: "Đăng Nhập thành công",
      });
      setTimeout(() => {
        navigate("/admin/home");
      }, 3000);
    } catch (error) {
      const res = error.response.data;
      if (res.status == "warning") {
        openNotification({
          title: "warning",
          message: `${res.message}`,
        });
        setUser({ username: "", password: "" });
      }
      if (res.status == "warning_password") {
        openNotification({
          title: "warning",
          message: `${res.message}`,
        });
        setUser({ ...user, password: "" });
      }
    }
  };

  return (
    <>
      <div>
        <a
          href='https://www.codewithfaraz.com/'
          className='logo'
          target='_blank'>
          <img src='https://www.codewithfaraz.com/InstaPic.png' alt />
        </a>
        <section className='border-red-500 bg-gray-200 min-h-screen flex items-center justify-center'>
          <div className='bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl'>
            <div className='md:w-1/2 px-5'>
              <h2 className='text-[3rem] font-bold text-[#002D74]'>Login</h2>

              <form className='mt-6' action='#' method='POST'>
                <div>
                  <label className='block text-gray-700'>Username</label>
                  <input
                    onChange={handleTakeValue}
                    type='text'
                    name='username'
                    placeholder='Enter Email Address'
                    className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                    value={user.username}
                  />
                </div>
                <div className='mt-4 relative'>
                  <label className='block text-gray-700'>Password</label>
                  <input
                    id='password'
                    onChange={handleTakeValue}
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    value={user.password}
                    maxLength={20}
                    className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none'
                    required
                  />

                  {!show ? (
                    <IoEyeOffOutline
                      onClick={handleShowPassword}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        bottom: "13px",
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : (
                    <IoEyeOutline
                      onClick={handleShowPassword}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "10px",
                        bottom: "13px",
                        fontSize: "1.5rem",
                      }}
                    />
                  )}
                  {/* */}
                </div>

                <button
                  onClick={handleLogin}
                  className='w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6'>
                  Log In
                </button>
              </form>
            </div>
            <div className='w-1/2 md:block hidden '>
              <img
                src='https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
                className='rounded-2xl'
                alt='page img'
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
