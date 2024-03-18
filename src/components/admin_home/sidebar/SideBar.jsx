import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const [sideBarlist, setSideBarList] = useState([
    {
      name: " NGƯỜI DÙNG",
      path: "home",
      iconNav: <FaUsers className="mr-[10px]" />,
      cssNav:
        "cursor-pointer inline-flex items-center py-3 text-blue-600 bg-white rounded-lg px-2",
    },
    {
      name: "SỰ  KIỆN",
      path: "product",
      iconNav: <IoCartOutline className="mr-[10px]" />,
      cssNav:
        "cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
    },
    {
      name: "CÁC LOẠI  VÉ",
      path: "category",
      iconNav: <IoCartOutline className="mr-[10px]" />,
      cssNav:
        "cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
    },
    {
      name: "THÀNH VIÊN ",
      path: "penefit",
      iconNav: <IoCartOutline className="mr-[10px]" />,
      cssNav:
        "cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
    },
    {
      name: " ĐƠN HÀNG",
      path: "bill",
      iconNav: <FaUsers className="mr-[10px]" />,
      cssNav:
        "cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
    },
    {
      name: " ADMIN",
      path: "adminlist",
      iconNav: <FaUsers className="mr-[10px]" />,
      cssNav:
        " cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
    },
  ]);
  useEffect(() => {
    const savedIndex = localStorage.getItem("selectedSidebarIndex");
    if (savedIndex !== null) {
      handleChange(Number(savedIndex));
    }
  }, []);

  const handleChange = (index) => {
    localStorage.setItem("selectedSidebarIndex", index);
    const newList = sideBarlist.map((item, i) => {
      if (index === i) {
        navigate(item.path);
        return {
          ...item,
          cssNav:
            "cursor-pointer inline-flex items-center py-3 text-blue-600 bg-white rounded-lg px-2",
        };
      } else {
        return {
          ...item,
          cssNav:
            " cursor-pointer inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2",
        };
      }
    });

    setSideBarList(newList);
  };

  return (
    <>
      {" "}
      <aside className="flex flex-col w-2/12">
        <a
          href="#"
          className="inline-flex items-center justify-center h-20 w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500"
        >
          <svg
            className="h-12 w-12 text-white"
            fill="currentColor"
            version="1.1"
            viewBox="0 0 215 215"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          >
            <title>Company logo</title>
            <path
              transform="matrix(1.28 0 0 1.28 13.057 10.462)"
              d="m121.65 15.95-11.2 11.2q-5.9-4.75-12.8-7.3-5.7-2.35-10.05-3.15v-16.7h-22.8v16.35l-6.9 1.75q-8.1 2.55-16.15 7.5l-11.6-11.65-15.95 15.75 11.8 11.65q-6.1 8.85-8.85 19.65l-0.8 4.55h-16.35v21.65h16.75l2.15 7.45q2.35 7.9 7.3 14.4l-12 11.6 15.35 15.35 12-11.8 6.5 3.95q8.85 4.3 16.75 5.7v16.15h22.8v-16.55q8.05-1.8 15.75-5.7l5.55-3.35 11.4 11.4 16.15-16.15-11.25-11.4q5.1-7.85 7.5-16.9l1.2-4.15h16.1v-21.65h-15.75q-1.55-8.5-4.5-15.35l-3.55-5.9 12-12.05-16.55-16.3m-7.65 58.85q-0.05 15.9-11.25 27.55-11.6 11-27.55 11-16.15 0-27.55-11.4-11.2-10.85-11.2-27.15 0-15.95 11.2-27.55 11.8-11.25 27.55-11.25 15.75 0 27.55 11.25 11.2 11.8 11.25 27.55"
              strokeLinecap="square"
              strokeWidth={1}
            />
            <path
              transform="matrix(.34872 0 0 .34872 83.818 78.7)"
              d="m144.75 65.137-94.088 94.088-50.662-50.663v-65.138l50.662 50.663 94.088-94.088v65.137"
              strokeLinecap="square"
              strokeWidth={6}
            />
          </svg>
          <span className="text-white text-4xl ml-2">Admin</span>
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            {/* <a className="inline-flex items-center py-3 text-blue-600 bg-white rounded-lg px-2">
              <FaUsers />
              <span className="ml-2" x-show="menu">
                Quản Lý Người Dùng
              </span>
            </a> */}

            {sideBarlist.map((item, index) => (
              <a
                key={index}
                className={item.cssNav}
                onClick={() => handleChange(index)}
              >
                {item.iconNav}
                <span className="" x-show="menu">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex justify-end">
            <a className="inline-flex p-3 hover:text-gray-400 justify-center border-gray-700 h-15 w-full border-t hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 px-2">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-2" x-show="menu">
                Settings
              </span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
