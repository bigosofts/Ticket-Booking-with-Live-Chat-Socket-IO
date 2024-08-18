"use client";
import "./QueryForm.css";
import { useRef, useState } from "react";
import { getToken } from "@/helper/sessionHelper";
import myToast from "@/components/toast/toast";
// import { createData } from "@/apiservices/orderapiservices";
import {
  createData as createConversations,
  selectAllData as selectConversations,
} from "@/apiservices/conversationapiservices";
import { createData } from "@/apiservices/messageapiservices";
import { useRouter } from "next/navigation";

const QueryForm = ({ item }) => {
  const router = useRouter();
  const sendMessageHandler = async (msg, conversationID) => {
    const text = msg;
    const attachment = item.travelImage[0];
    const sender = isAdmin.data.userName;
    const senderRole = isAdmin.data.userRole;
    const receiver = item.createdUser;
    const receiverRole = item.createdUserType;
    const ID = conversationID;
    const sendedpackage = "";

    const acceptedPkg = false;
    const rejectedPkg = false;
    const quantity = 1;
    const xtraPrice = 0;
    debugger;

    const messageResponse = await createData(
      text,
      attachment,
      sender,
      senderRole,
      receiver,
      receiverRole,
      ID,
      sendedpackage,
      acceptedPkg,
      rejectedPkg,
      quantity,
      xtraPrice
    );
    debugger;
    if (messageResponse) {
      if (messageResponse.status == "Success") {
        myToast.success("message send");
      } else {
        console.log(messageResponse);
      }
    }
    debugger;
  };

  async function SendMsgRequest(Data) {
    if (isAdmin.status == "noToken") {
      myToast.danger("You need to login to start Messaging");
    } else {
      let conversationID = Data.createdUser + isAdmin.data.userName;

      const resC = await selectConversations(
        { conversationID: conversationID },
        { conversationID: true }
      );
      if (resC.data.length > 0) {
        myToast.warning("Conversation already created. Go to message");
      } else {
        let res = await createConversations(
          conversationID,
          Data.createdUser,
          Data.createdUserType,
          isAdmin.data.userName,
          isAdmin.data.userRole,
          Data.packageId
        );

        if (res) {
          if (res.status == "Success") {
            myToast.success("Request Accepted");
            setTimeout(() => {
              router.push(`/dashboard/${isAdmin.data.userName}/setting`);
            }, 2000);
          } else {
            myToast.warning("Something Went Wrong, See console");
            console.log(res);
          }
        }
      }
    }
  }
  async function sendMessage(Data, formattedText) {
    if (isAdmin.status == "noToken") {
      myToast.danger("You need to login to start Messaging");
    } else {
      let conversationID = isAdmin.data.userName + Data.createdUser;
      const resC = await selectConversations(
        { conversationID: conversationID },
        { conversationID: true }
      );
      if (resC.data.length > 0) {
        sendMessageHandler(formattedText, resC.data[0].conversationID);
        debugger;
        myToast.warning("Conversation already created. Go to message");
      } else {
        let res = await createConversations(
          conversationID,
          isAdmin.data.userName,
          isAdmin.data.userRole,
          Data.createdUser,
          Data.createdUserType,
          Data.packageId
        );

        if (res) {
          if (res.status == "Success") {
            myToast.success("Request Accepted");
            debugger;
            sendMessageHandler(formattedText, conversationID);
            debugger;
            // setTimeout(() => {
            //   router.push(`/dashboard/${isAdmin.data.userName}/setting`);
            // }, 2000);
          } else {
            myToast.warning("Something Went Wrong, See console");
            console.log(res);
          }
        }
      }
    }
  }

  const isAdmin = getToken("token_travel");

  const dateref = useRef();
  const durationref = useRef();
  const groupsizeref = useRef();
  const experienceref = useRef();
  const furtherref = useRef();
  const moreRadio1ref = useRef();
  const moreRadio2ref = useRef();
  const moreRadio3ref = useRef();

  const FormattedDesc = () => {
    const moreRadio1 = moreRadio1ref.current.checked;
    const moreRadio2 = moreRadio2ref.current.checked;
    const moreRadio3 = moreRadio3ref.current.checked;

    const multipleAnswer = `
    ${moreRadio1 ? "Have Equipment: Yes" : "Have Equipment: No"},

    ${moreRadio2 ? "Have Food: Yes" : "Have Food: No"},

    ${moreRadio3 ? "Have Accomodation: Yes" : "Have Accomodation: No"}`;

    const text = `
    Hey, I want to know the quotation and details of your package. Here is my requirement:


    Available Date: ${niceDate(dateref.current.value)},

    Duration (days): ${durationref.current.value},

    Group Size: ${groupsizeref.current.value},

    Previous Experience: ${experienceref.current.value},

    Further Request: ${furtherref.current.value},

    ${multipleAnswer}
    
    `;

    return text;
  };

  //   const router = useRouter();

  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth() + 1;
  // const date = currentDate.getDate();
  // const hour = currentDate.getHours();
  // const minute = currentDate.getMinutes();
  // const second = currentDate.getSeconds();
  // const millisecond = currentDate.getMilliseconds();
  // let uniqueNumber = `order-${year}${month}${date}${hour}${minute}${second}${millisecond}`;

  // async function orderCreate() {
  //   let res = await createData(
  //     uniqueNumber,
  //     item.packageId,
  //     item.createdUser,
  //     FormattedDesc(),
  //     "unpaid",
  //     item.price,
  //     1,
  //     "active",
  //     isAdmin.data.userName
  //   );
  //   if (res) {
  //     if (res.status == "noToken") {
  //       myToast.danger("You need to login to place order");
  //     } else {
  //       setBookLoad(true);
  //       myToast.success("You Order has been delivered");
  //     }
  //   }
  // }

  function niceDate(isoTime) {
    var date = new Date(isoTime);

    var options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div
      className="form-single-page"
      style={{ width: "80%", margin: "20px auto" }}
    >
      <div>
        <h1>Dates you’re available:</h1>
        <input ref={dateref} type="date"></input>
      </div>
      <div>
        <h1>How long do you want it for:</h1>
        <select style={{ height: "30px" }} ref={durationref}>
          <option value="">Select Duration</option>
          <option value="1 Day">1 Day</option>
          <option value="2 Days">2 Days</option>
          <option value="3 Days">3 Days</option>
          <option value="4 Days">4 Days</option>
          <option value="5 Days">5 Days</option>
          <option value="6 Days">6 Days</option>
          <option value="7 Days">1 Week</option>
          <option value="8 Days">8 Days</option>
          <option value="9 Days">9 Days</option>
          <option value="10 Days">10 Days</option>
          <option value="14 Days">2 Weeks</option>
          <option value="21 Days">3 Weeks</option>
          <option value="30 Days">1 Month</option>
          <option value="60 Days">2 Months</option>
          <option value="90 Days">3 Months</option>
        </select>
      </div>
      <div>
        <h1>Group Size:</h1>
        <input ref={groupsizeref} type="text"></input>
      </div>

      <div className="checkbox-single-form">
        <h1>What you require:</h1>
        <div style={{ display: "flex" }}>
          <label for="box1">Equipment</label>
          <input ref={moreRadio1ref} id="box1" type="checkbox" />
        </div>

        <div style={{ display: "flex" }}>
          <label for="box2">Food</label>
          <input ref={moreRadio2ref} id="box2" type="checkbox" />
        </div>
        <div style={{ display: "flex" }}>
          <label for="box3">Accomodation</label>
          <input ref={moreRadio3ref} id="box3" type="checkbox" />
        </div>
      </div>
      <div>
        <h1 style={{ marginTop: "10px" }}>
          Previous experience & fitness level:
        </h1>
        <textarea
          style={{ width: "100%" }}
          rows={3}
          ref={experienceref}
          type="text"
        ></textarea>
      </div>
      <div>
        <h1>Any further requests:</h1>
        <textarea
          style={{ width: "100%" }}
          rows={3}
          ref={furtherref}
          type="text"
        ></textarea>
      </div>
      <div
        style={{
          height: "80px",
          marginTop: "20px",
        }}
        className="d-grid gap-2 book-button"
      >
        {/* {isAdmin.data ? (
          isAdmin.data.userRole == "instructor" ? (
            <button
              onClick={msgFailed}
              className="btn btn-secondary"
              type="button"
              style={{ fontSize: "20px" }}
            >
              Request a Guide
            </button>
          ) : (
            <button
              onClick={orderCreate}
              className="btn btn-secondary"
              type="button"
              style={{ fontSize: "20px" }}
            >
              {bookLoad ? "Request already sent" : "Request a Guide"}
            </button>
          )
        ) : (
          <button
            onClick={orderCreate}
            className="btn btn-secondary"
            type="button"
            style={{ fontSize: "20px" }}
          >
            {bookLoad ? "Request already sent" : "Request a Guide"}
          </button>
        )} */}

        {item.packageType == "custom" && isAdmin.data.userRole == "client" ? (
          ""
        ) : item.packageType == "custom" &&
          isAdmin.data.userRole == "instructor" ? (
          <button
            onClick={() => SendMsgRequest(item)}
            style={{ fontSize: "20px" }}
            className="btn btn-primary"
            type="button"
          >
            Talk to Client
          </button>
        ) : item.packageType == "package" &&
          isAdmin.data.userRole == "client" ? (
          <button
            onClick={() => sendMessage(item, FormattedDesc())}
            style={{ fontSize: "20px" }}
            className="btn btn-primary"
            type="button"
          >
            Request a Guide
          </button>
        ) : item.packageType == "package" &&
          isAdmin.data.userRole == "instructor" ? (
          ""
        ) : (
          <button
            onClick={() => sendMessage(item, FormattedDesc())}
            style={{ fontSize: "20px" }}
            className="btn btn-primary"
            type="button"
          >
            Request a Guide
          </button>
        )}
      </div>
    </div>
  );
};

export default QueryForm;
