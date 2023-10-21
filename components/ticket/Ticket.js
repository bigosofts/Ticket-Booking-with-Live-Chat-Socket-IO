"use client";
import "./ticket.css";
import { useEffect, useState, useRef } from "react";
import { selectData as selectOrders } from "@/apiservices/orderapiservices";
import { selectData as selectPackages } from "@/apiservices/travelpackageapiservices";
import { selectData as selectinstructor } from "@/apiservices/instructorapiservices";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import { getToken } from "@/helper/sessionHelper";

const Ticket = () => {
  const isAdmin = getToken("token_travel");
  const searchParams = useSearchParams();
  const searchtext = searchParams.get("orderid");

  const id = searchtext;
  const [orders, setOrders] = useState();
  const [packages, setPackages] = useState();
  const [profiles, setProfiles] = useState();
  const componentref = useRef();

  useEffect(() => {
    async function getData() {
      const res = await selectOrders(
        { orderID: id, orderStatus: "completed" },
        {}
      );
      if (res.data) {
        if (res.data[0].instructorID == isAdmin.data.userName) {
          setOrders(res.data);
          const res2 = await selectPackages(
            { packageId: res.data[0].packageID },
            {}
          );
          const res4 = await selectinstructor({
            userName: res.data[0].instructorID,
          });
          setPackages(res2.data);
          setProfiles(res4.data);
        }else{
          alert("You are not allowed to download Ticket. Ask Instructor for download Tickets")
        }
      }
    }
    getData();
  }, []);
  function niceDate(date) {
    var isoTime = date;
    var date = new Date(isoTime);

    var options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const triggerCaptureAndDownload = async () => {
    const container = componentref.current;

    if (container) {
      const node = container;
      const canvas = await html2canvas(node, {
        scale: 5,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "ticket.png";
      link.click();
    }
  };
  if (orders && packages && profiles) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          ref={componentref}
          style={{
            padding: "50px 20px",
            width: "80rem",
            border: "5px dotted #000",
          }}
        >
          <article class="ticket">
            <div class="ticket__wrapper">
              <div class="ticket__header">
                Active Ascents {` -${orders[0].orderID}`}
              </div>
            </div>
            <div class="ticket__divider">
              <div class="ticket__notch"></div>
              <div class="ticket__notch ticket__notch--right"></div>
            </div>
            <div class="ticket__body">
              <div className="flex-ticket">
                <section class="ticket__section">
                  <h3>Your Tickets</h3>
                  <p>Client Name: {orders[0].clientID}</p>

                  <p>Order ID : {orders[0].orderID}</p>
                  <p>Order Quantity: {orders[0].orderNumber}</p>
                  <p>Order Date: {niceDate(orders[0].orderCreatedDate)}</p>
                  <p>Ordered Package: {orders[0].packageID}</p>
                  <p>Instructor ID: {orders[0].instructorID}</p>
                  <p>Instructor Phone: {profiles[0].instructorPhone}</p>
                  <p>Instructor Email: {profiles[0].instructorEmail}</p>
                </section>
                <section class="ticket__section">
                  <h3>Package Details</h3>
                  <p>Package Name: {packages[0].packageTitle}</p>
                  <p>Travel Date: {niceDate(packages[0].travelTime)} </p>
                  <p>
                    Travel Place: {packages[0].place}, {packages[0].country}{" "}
                  </p>
                  <p>Group Size: {packages[0].groupSize} members </p>
                  <p>Have Guiding: {packages[0].haveGuiding ? "Yes" : "No"} </p>
                  <p>
                    Have Accomodation:{" "}
                    {packages[0].haveAccomodation ? "Yes" : "No"}{" "}
                  </p>
                  <p>Have Food: {packages[0].haveFood ? "Yes" : "No"} </p>
                  <p>Duration: {packages[0].duration} Days </p>
                </section>
              </div>

              <section class="ticket__section">
                <h3>Payment Method</h3>
                <p>On Hand before the tour</p>
              </section>
            </div>
            <footer class="ticket__footer">
              <span>Total Payable Amount</span>
              <span>${orders[0].orderPrice}</span>
            </footer>
          </article>
        </div>
        <button
          type="btn"
          className="btn btn-success"
          onClick={triggerCaptureAndDownload}
        >
          Download Ticket
        </button>
      </div>
    );
  }
};

export default Ticket;
