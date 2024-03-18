import { Button, notification, Space } from "antd";

import { IoMdWarning } from "react-icons/io";
import React from "react";
const openNotification = (notifi) => {
  if (notifi.title == "warning") {
    console.log(object);
    notification.open({
      message: (
        <>
          <span
            style={{
              color: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoMdWarning style={{ marginRight: "10px" }} />
            {notifi.message}
          </span>
        </>
      ),
    });
  }
  if (notifi.title == "success") {
    notification.open({
      message: (
        <>
          <span
            style={{
              color: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
              fontSize: "1.5rem",
            }}
          >
            <IoMdWarning style={{ marginRight: "10px" }} />
            {notifi.message}
          </span>
        </>
      ),
    });
  }
};
export default openNotification;
