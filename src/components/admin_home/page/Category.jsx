import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import publicAxios from "../../config/publicAxios";
import openNotification from "../../notification/notification";
export default function Ticket() {
  const [listProduct, setListProduct] = useState([]);
  const takeProduct = async () => {
    const product = await publicAxios.get("/api/v1/sticket");

    setListProduct(product.data.data);
  };
  useEffect(() => {
    takeProduct();
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <>
      {" "}
      <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
        <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
          <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
            Quản lý sản phẩm
          </div>
          <div className="p-3">
            <table className="table-responsive w-full rounded">
              <thead>
                <tr>
                  <th className="border w-1/4 px-4 py-2">Loại Vé</th>
                  <th className="border w-1/6 px-4 py-2">Sự Kiện</th>
                  <th className="border w-1/6 px-4 py-2">Giá Vé</th>
                  <th className="border w-1/6 px-4 py-2">Tổng số vé</th>
                  <th className="border w-1/6 px-4 py-2">Số vé đã bán</th>
                  <th className="border w-1/6 px-4 py-2">Số vé chưa bán</th>
                  <th className="border w-1/5 px-4 py-2">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                
                {listProduct.map((item) => (
                  <tr className="text-center">
                    <td className="border px-4 py-2">{item.ticket_type}</td>
                    <td className=" border px-4 py-2">{item.event_name}</td>
                    <td className="border px-4 py-2">
                      {VND.format(item.price)}
                    </td>
                    <td className=" border px-4 py-2">{item.total_quantity}</td>
                    <td className=" border px-4 py-2"> {item.quantity_sold}</td>
                    <td className=" border px-4 py-2">
                      {" "}
                      {item.quantity_available}
                    </td>

                    <td className=" border px-4 py-2">
                      <div className=" flex items-center justify-center text-[20px] ">
                        {" "}
                        <FaRegEdit className="mr-[30px] cursor-pointer" />
                        <FaRegTrashCan className=" cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
