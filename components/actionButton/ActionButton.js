"use client";
import { useRef, useState, useEffect } from "react";
import { selectData } from "@/apiservices/travelpackageapiservices";
import { selectData as selectOrders } from "@/apiservices/orderapiservices";
import { getToken } from "@/helper/sessionHelper";



const ActionButton = ({ clickHandler, packageID, deleteHandler }) => {
  const hardRefreshCustom = (link) => {
    if (typeof window !== "undefined") {
      window.location.href = link;
    }
  };
  
  const [data, setData] = useState();

  const packageIDref = useRef();
  const quantityNumref = useRef();
  const additionalPriceref = useRef();

  const [formData, setFormData] = useState({
    pkgID: "",
    acceptPackage: false,
    rejectPackage: false,
    qtyPackage: 1,
    extraPrice: 0,
  });

  useEffect(() => {
    async function getData() {
      const isAdmin = await getToken("token_travel");

      const condition1 = {
        packageType: "package",
      };
      const condition2 = {
        createdUser: isAdmin.data.userName,
      };
      const condition3 = {
        createdUserType: "instructor",
      };
      const condition4 = {
        packageType: "custom",
      };
      const condition5 = {
        createdUser: packageID.creatorID,
      };
      const condition6 = {
        createdUserType: packageID.creatorRole,
      };

      const combinedConditions = {
        $and: [condition1, condition2, condition3],
      };
      const combinedConditions2 = {
        $and: [condition4, condition5, condition6],
      };
      const queryObject = {
        clientID: packageID.creatorID,
        instructorID: isAdmin.data.userName,
        orderStatus: "completed",
      };
      const res3 = await selectOrders(queryObject, {});

      const res = await selectData(combinedConditions, {});
      const res2 = await selectData(combinedConditions2, {});
      setData(res.data);
      setData((prev) => prev.concat(res2.data));
      setData((prev) => prev.concat(res3.data));
    }
    getData();
  }, [packageID]);

  function onChangeHandler1(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      pkgID: e.target.value,
    }));
  }

  function onChangeHandler2(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      qtyPackage: e.target.value,
    }));
  }

  function onChangeHandler3(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      extraPrice: e.target.value,
    }));
  }

  if (data && formData) {
    console.log(data);
    return (
      <>
        <div className="action-button">
          <div className="selectionPackage">
            <div style={{ width: "100%" }}>
              <label htmlFor="packageID">
                PackageID: {packageID.selectedPackageID}
              </label>
              <select
                className="input-post-type"
                id="packageID"
                name="packageID"
                ref={packageIDref}
                value={formData.pkgID}
                onChange={onChangeHandler1}
              >
                {data.map((item, i) => (
                  <option
                    key={i}
                    value={item.orderID ? item.orderID : item.packageId}
                  >
                    {item.orderID
                      ? `Order: ${item.orderID}`
                      : item.packageType == "package"
                      ? `Package: ${item.packageId}`
                      : item.packageType == "custom"
                      ? `Custom: ${item.packageId}`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ width: "100%" }}>
              <label htmlFor="quantityNum">Enter Quantity:</label>
              <input
                type="number"
                id="quantityNum"
                ref={quantityNumref}
                value={formData.qtyPackage}
                onChange={onChangeHandler2}
              />
            </div>

            <div style={{ width: "100%" }}>
              <label htmlFor="additionalPrice">Additional Price:</label>
              <input
                type="number"
                id="additionalPrice"
                ref={additionalPriceref}
                value={formData.extraPrice}
                onChange={onChangeHandler3}
              />
            </div>
          </div>
        </div>
        <div className="action-button">
          <button
            style={{ padding: "5px 20px" }}
            onClick={() =>
              clickHandler(
                packageIDref.current.value,
                formData.acceptPackage,
                formData.rejectPackage,
                quantityNumref.current.value,
                additionalPriceref.current.value
              )
            }
            type="button"
            class="chat-button"
            data-mdb-color="dark"
          >
            Send a price
          </button>
          <button
            style={{ padding: "5px 20px" }}
            onClick={() => deleteHandler(packageIDref.current.value)}
            type="button"
            class="chat-button"
            data-mdb-color="dark"
          >
            Reject request
          </button>
          <button
            onClick={() => hardRefreshCustom(`/ticket?orderid=${formData.pkgID}`)}
            style={{ padding: "5px 20px" }}
            type="button"
            class="chat-button"
            data-mdb-color="dark"
          >
            Generate Ticket
          </button>
        </div>
      </>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

export default ActionButton;
