import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import publicAxios from "../../config/publicAxios";
import openNotification from "../../notification/notification";
import { Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Product() {
  const [listProduct, setListProduct] = useState([]);
  const takeProduct = async () => {
    const product = await publicAxios.get("/api/v1/events");

    setListProduct(product.data.data);
  };
  useEffect(() => {
    takeProduct();
  }, []);
  const handleRemove = async (item) => {
    await publicAxios.delete(`/api/v1/sticket/${item.event_id}`);
    takeProduct();
  };
  const [itemEdit, setItemEdit] = useState("");
  const handleEdit = async (item) => {
    setIsModalOpen(true);
    setItemEdit(item);
    openNotification(message.data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const [fileList, setFileList] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const changeImage = (event) => {
    setSelectedMedia(event.target.files[0]);
    // xem trước media
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const [addEdit, setAddEdit] = useState("");
  const handleChangeValue = (e) => {
    const { value, name } = e.target;
    setItemEdit({ ...itemEdit, [name]: value });
  };
  const handleChangeValue1 = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setAddEdit({ ...addEdit, [name]: value });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/df2dkudau/image/upload",
          formData,
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      const newData = { ...itemEdit, event_image: media };
      const message = await publicAxios.patch(`/api/v1/sticket`, newData);
      openNotification(message.data);
      takeProduct();
      setItemEdit("");
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      setPreview("");
    } catch (error) {
      console.log(error);
    }
  };
  const [checkAddEvent, setCheckAddEvent] = useState(false);
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "project");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/df2dkudau/image/upload",
          formData,
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      console.log(addEdit);
      const newData = { ...addEdit, event_image: media };
      const message = await publicAxios.post(`/api/v1/newSticket`, newData);
      openNotification(message.data);
      takeProduct();
      setAddEdit("");
      setCheckAddEvent(false);
      setTimeout(() => {
        setIsModalOpen1(false);
      }, 2000);
      setPreview("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title='Edit Item'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <>
          {" "}
          <div className='flex flex-1  flex-col md:flex-row lg:flex-row mx-2 w-full'>
            <div className='mb-2 border-solid border-gray-300 rounded border shadow-sm  w-full'>
              <div className='bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b'>
                Thêm sản phẩm
              </div>
              <div className='p-3'>
                <form className='w-full'>
                  <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-full px-3'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-light mb-1'
                        htmlFor='grid-last-name'>
                        Tên Sản Phẩm
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600'
                        id='grid-last-name'
                        type='text'
                        placeholder='Doe'
                        value={itemEdit ? itemEdit.event_name : ""}
                        name='event_name'
                        onChange={handleChangeValue}
                      />
                    </div>
                  </div>

                  <div className='-mx-3 mb-2'>
                    <div
                      className='w-full md:w-full px-3 '
                      style={{ paddingBottom: "20px" }}>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-light mb-1'
                        htmlFor='grid-last-name'>
                        Khu vực
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600'
                        id='grid-last-name'
                        type='text'
                        placeholder='Doe'
                        value={itemEdit ? itemEdit.event_location : ""}
                        name='event_location'
                        onChange={handleChangeValue}
                      />
                    </div>
                    <div className='w-full md:w-full px-3 mb-6 md:mb-[10px]'>
                      <label
                        className='block uppercase tracking-wide text-grey-darker text-xs font-light mb-1'
                        htmlFor='grid-city'>
                        Ảnh sản Phẩm
                      </label>
                      <input
                        className='appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey'
                        id='inputGroupFile01'
                        type='file'
                        onChange={changeImage}
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          zIndex: "-999",
                        }}
                      />
                      <Button icon={<UploadOutlined />}>
                        <label
                          htmlFor='inputGroupFile01'
                          style={{ cursor: "pointer" }}>
                          Tải ảnh lên
                        </label>
                      </Button>
                    </div>

                    <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                      <img src={preview} alt='' width={100} />
                      <label
                        className='block uppercase tracking-wide text-grey-darker text-xs font-light mb-1'
                        htmlFor='grid-zip'>
                        Giới thiệu
                      </label>
                      <input
                        className='appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey'
                        id='grid-zip'
                        type='text'
                        placeholder='ngon'
                        value={itemEdit.description}
                        name='description'
                        onChange={handleChangeValue}
                      />
                      <div>
                        {" "}
                        <Button
                          onClick={handleEditProduct}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            marginTop: "10px",
                          }}>
                          Sửa sản Phẩm
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </Modal>

      <Modal
        title='Edit Item'
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}>
        <>
          {" "}
          <div className='flex flex-1  flex-col md:flex-row lg:flex-row mx-2 w-full'>
            <div className='mb-2 border-solid border-gray-300 rounded border shadow-sm  w-full'>
              <div className='bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b'>
                Thêm sản phẩm
              </div>
              <div className='p-3'>
                <form className='w-full'>
                  <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-full px-3'>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-light mb-1'
                        htmlFor='grid-last-name'>
                        Tên Sản Phẩm
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600'
                        id='grid-last-name'
                        type='text'
                        placeholder='Doe'
                        value={addEdit ? addEdit.event_name : ""}
                        name='event_name'
                        onChange={handleChangeValue1}
                      />
                    </div>
                  </div>

                  <div className='-mx-3 mb-2'>
                    <div
                      className='w-full md:w-full px-3 '
                      style={{ paddingBottom: "20px" }}>
                      <label
                        className='block uppercase tracking-wide text-gray-700 text-xs font-light mb-1'
                        htmlFor='grid-last-name'>
                        Khu vực
                      </label>
                      <input
                        className='appearance-none block w-full bg-gray-200 text-grey-darker border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white-500 focus:border-gray-600'
                        id='grid-last-name'
                        type='text'
                        placeholder='Doe'
                        value={addEdit ? addEdit.event_location : ""}
                        name='event_location'
                        onChange={handleChangeValue1}
                      />
                    </div>
                    <div className='w-full md:w-full px-3 mb-6 md:mb-[10px]'>
                      <label
                        className='block uppercase tracking-wide text-grey-darker text-xs font-light mb-1'
                        htmlFor='grid-city'>
                        Ảnh sản Phẩm
                      </label>
                      <input
                        className='appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey'
                        id='inputGroupFile01'
                        type='file'
                        onChange={changeImage}
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          zIndex: "-999",
                        }}
                      />
                      <Button icon={<UploadOutlined />}>
                        <label
                          htmlFor='inputGroupFile01'
                          style={{ cursor: "pointer" }}>
                          Tải ảnh lên
                        </label>
                      </Button>
                    </div>

                    <div className='w-full md:w-full px-3 mb-6 md:mb-0'>
                      <img src={preview} alt='' width={100} />
                      <label
                        className='block uppercase tracking-wide text-grey-darker text-xs font-light mb-1'
                        htmlFor='grid-zip'>
                        Giới thiệu
                      </label>
                      <input
                        className='appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey'
                        id='grid-zip'
                        type='text'
                        placeholder='ngon'
                        value={addEdit.description}
                        name='description'
                        onChange={handleChangeValue1}
                      />
                      <div>
                        <Button
                          onClick={handleAddProduct}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            marginTop: "10px",
                          }}>
                          Thêm sản Phẩm
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </Modal>

      <div className='flex flex-1  flex-col md:flex-row lg:flex-row mx-2'>
        <div className='mb-2 border-solid border-gray-300 rounded border shadow-sm w-full'>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className='bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b'>
            <span>Quản lý sản phẩm</span>
            <div>
              {" "}
              <Button
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={() => {
                  setIsModalOpen1(true);
                }}>
                Thêm
              </Button>
            </div>
          </div>

          <div className='p-3'>
            <table className='table-responsive w-full rounded'>
              <thead>
                <tr>
                  <th className='border w-1/4 px-4 py-2'>Tên Sự Kiện</th>
                  <th className='border w-1/6 px-4 py-2'>Ảnh</th>
                  <th className='border w-1/6 px-4 py-2'>Khu Vực</th>
                  <th className='border w-1/5 px-4 py-2'>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((item) => (
                  <tr className='text-center'>
                    <td className='border px-4 py-2'>{item.event_name}</td>
                    <td className=' border px-4 py-2'>
                      {" "}
                      <div className='flex justify-center'>
                        {" "}
                        <img
                          className='flex-shrink-0 img-fluid rounded'
                          src={item.event_image}
                          alt
                          style={{ width: 80 }}
                        />
                      </div>
                    </td>
                    <td className='border px-4 py-2'>{item.event_location}</td>

                    <td className=' border px-4 py-2'>
                      <div className=' flex items-center justify-center text-[20px] '>
                        {" "}
                        <FaRegEdit
                          onClick={() => handleEdit(item)}
                          className='mr-[30px] cursor-pointer'
                        />
                        <FaRegTrashCan
                          onClick={() => handleRemove(item)}
                          className=' cursor-pointer'
                        />
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
