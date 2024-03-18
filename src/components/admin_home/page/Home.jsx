import React, { useEffect, useState } from "react";
import publicAxios from "../../config/publicAxios";
import openNotification from "../../notification/notification";

export default function Home() {
  const [listUser, setListUser] = useState([]);

  const handleTakeUserInDb = async () => {
    try {
      const responsi = await publicAxios.get("/admin/takeUser");
      console.log(responsi);
      setListUser(responsi.data.data);
    } catch (error) {
      openNotification({
        title: "Error",
        message: "Lỗi",
      });
    }
  };
  useEffect(() => {
    handleTakeUserInDb();
  }, []);
  const handleLock = async (user) => {
    try {
      const responsi = await publicAxios.patch(
        `/admin/takeUser/${user.id}`,
        user
      );

      openNotification({
        status: responsi.data.status,
        message: responsi.data.message,
      });

      handleTakeUserInDb();
    } catch (error) {
      openNotification({
        title: "Error",
        message: "Lỗi",
      });
    }
  };
  return (
    <>
      {" "}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              Quản lý người dùng
            </h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                {/* <select className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select> */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className=" -mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto">
            <div className="h-[83vh] inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tên Đăng Nhập
                    </th> */}

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tên Người Dùng
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ngày Khởi Tạo
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trạng Thái
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!listUser ? (
                    <></>
                  ) : (
                    listUser.map((user, index) => (
                      <tr key={index}>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {user.full_name}
                              </p>
                            </div>
                          </div>
                        </td> */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className=" text-gray-900 whitespace-no-wrap">
                            {user.full_name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Jan 21, 2020
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            {user.status == "normal" ? (
                              <>
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                />
                                <span className="relative">Bình thường</span>
                              </>
                            ) : (
                              <>
                                <span
                                  aria-hidden
                                  className="absolute min-w-[110px] inset-0 bg-red-700 opacity-50 rounded-full"
                                />
                                <span className="relative ">Khóa</span>
                              </>
                            )}
                          </span>
                        </td>
                        <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block pr-[20px] py-1 font-semibold text-green-900 leading-tight">
                            <button
                              onClick={() => handleLock(user)}
                              class="middle none center min-w-[120px] rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-light="true"
                            >
                              {user.status == "lock" ? <>Khóa</> : <>Mở Khóa</>}
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* <div className=" px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <div className="absolute bottom-5 inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
