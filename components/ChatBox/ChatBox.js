"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import "./ChatBox.css";
import OfferCard from "../offerCard/OfferCard";
import ActionButton from "../actionButton/ActionButton";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/isAdmin/isAdminSlice";
import { getToken, setToken } from "@/helper/sessionHelper";
import {
  selectData as selectConversations,
  createData as createConversation,
} from "@/apiservices/conversationapiservices";
import { selectData as selectMessages } from "@/apiservices/messageapiservices";
import { createData } from "@/apiservices/messageapiservices";
import mytoast from "../toast/toast";
import { deleteData } from "@/apiservices/conversationapiservices";
import { deleteData as deleteMessage } from "@/apiservices/messageapiservices";
import io from "socket.io-client";

const ChatBox = () => {
  const hardRefreshCustom = (link) => {
    if (typeof window !== "undefined") {
      window.location.href = link;
    }
  };
  const fulScrrenItem = useRef();
  const [socket, setSocket] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  const sendMessageHandler = async (
    ID,
    acceptedPackage,
    rejectedPackage,
    quantityPackage,
    additional
  ) => {
    try {
      let fileInput = document.getElementById("fileInput");
      let messageInput = document.getElementById("messageInput");
      let fileUploadData;

      if (fileInput.files[0]) {
        const formData = new FormData();
        formData.append("fileInput", fileInput.files[0]); // Upload the selected file

        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.log(response);
          fileUploadData = "";
        } else {
          const data = await response.json();
          fileUploadData = data;
        }
      }

      function findReceiver() {
        let creatorID = selectedConversation[0].creatorID;
        let creatorRole = selectedConversation[0].creatorRole;
        let participantID = selectedConversation[0].participantID;
        let participantRole = selectedConversation[0].participantRole;

        if (creatorID !== isAdmin.data.userName) {
          return creatorID;
        } else if (creatorID == isAdmin.data.userName) {
          if (creatorRole !== isAdmin.data.userRole) {
            return creatorID;
          } else if (participantID !== isAdmin.data.userName) {
            return participantID;
          } else if (participantID == isAdmin.data.userName) {
            if (participantRole !== isAdmin.data.userRole) {
              return participantID;
            }
          }
        }
      }
      function findReceiverRole() {
        let creatorID = selectedConversation[0].creatorID;
        let creatorRole = selectedConversation[0].creatorRole;
        let participantID = selectedConversation[0].participantID;
        let participantRole = selectedConversation[0].participantRole;

        if (creatorID !== isAdmin.data.userName) {
          return creatorRole;
        } else if (creatorID == isAdmin.data.userName) {
          if (creatorRole !== isAdmin.data.userRole) {
            return creatorRole;
          } else if (participantID !== isAdmin.data.userName) {
            return participantRole;
          } else if (participantID == isAdmin.data.userName) {
            if (participantRole !== isAdmin.data.userRole) {
              return participantRole;
            }
          }
        }
      }

      const text = messageInput.value ? messageInput.value : "...";
      const attachment = fileUploadData ? fileUploadData.fileUrl : "";
      const sender = isAdmin.data.userName;
      const senderRole = isAdmin.data.userRole;
      const receiver = findReceiver();
      const receiverRole = findReceiverRole();
      const conversationID = selectedConversation[0].conversationID;
      const sendedpackage = ID;

      const acceptedPkg = acceptedPackage;
      const rejectedPkg = rejectedPackage;
      const quantity = quantityPackage;
      const xtraPrice = additional;

      const messageResponse = await createData(
        text,
        attachment,
        sender,
        senderRole,
        receiver,
        receiverRole,
        conversationID,
        sendedpackage,
        acceptedPkg,
        rejectedPkg,
        quantity,
        xtraPrice
      );

      if (messageResponse) {
        if (messageResponse.status == "Success" && socket) {
          socket.emit("msg", {
            message: messageResponse.data,
          });

          mytoast.success("message send");

          document.getElementById("messageInput").value = "";

          // Clear the file input
          const fileInput = document.getElementById("fileInput");
          fileInput.value = "";
        } else {
          console.log(messageResponse);
        }
      }

      // Handle the server's response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const deleteConversationHandler = async () => {
    const res = await deleteData(selectedConversation[0]._id);

    if (res) {
      if (res.status == "Success" && socket) {
        mytoast.success("Conversation deleted");
        hardRefreshCustom(`/dashboard/${isAdmin.data.userName}/setting`);
      } else {
        console.log(res);
      }
    }
  };
  const deleteMessageHandler = async (pkid) => {
    const condition1 = {
      sender: isAdmin.data.userName,
      senderRole: isAdmin.data.userRole,
    };

    const condition2 = {
      sendedpackageID: pkid,
    };

    const combinedConditions1 = {
      $and: [condition1, condition2],
    };

    const res3 = await selectMessages(combinedConditions1, {});
    const originalArray = res3.data;
    const reversedArray = [...originalArray].reverse();

    const res = await deleteMessage(
      reversedArray[reversedArray.length - 1]._id
    );

    if (res) {
      if (res.status == "Success" && socket) {
        socket.emit("msg", res.data);
        mytoast.success("Offer Message deleted");
      } else {
        console.log(res);
      }
    }
  };

  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [stateChanger, setStateChanger] = useState(true);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin.value);
  useEffect(() => {
    if (selected !== null) {
      const datas = getToken("selectConversations");
      setSelectedConversation(datas);
    }
  }, [selected]);
  useEffect(() => {
    async function getData() {
      const res2 = await getToken("token_travel");
      if (res2) {
        const condition3 = {
          sender: res2.data.userName,
          senderRole: res2.data.userRole,
        };

        const condition4 = {
          receiver: res2.data.userName,
          receiverRole: res2.data.userRole,
        };

        const combinedConditions1 = {
          $or: [condition3, condition4],
        };

        const res3 = await selectMessages(combinedConditions1, {});
        setMessage(res3.data);

        dispatch(setInitialData(res2));

        const condition1 = {
          creatorID: res2.data.userName,
          creatorRole: res2.data.userRole,
        };
        const condition2 = {
          participantID: res2.data.userName,
          participantRole: res2.data.userRole,
        };

        const combinedConditions = {
          $or: [condition1, condition2],
        };

        const res = await selectConversations(combinedConditions, {});
        if (res) {
          setConversation(res.data);
        }
      }
    }
    getData();
  }, [stateChanger]);
  useEffect(() => {
    async function setSelct() {
      if (conversation.length > 0) {
        setToken("selectConversations", [conversation[0]]);

        setSelectedConversation([conversation[0]]);
        setSelected([conversation[0]]);
      }
    }
    setSelct();
  }, []);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(); // Create the socket if it doesn't exist
      setSocket(newSocket);
    }

    // Clean up the socket on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("serverMSG", (data) => {
        if (data) {
          // Update the state by returning the new value
          setStateChanger((prev) => !prev);
        }
      });
    }
  }, [socket]);

  function niceDate(date) {
    var isoTime = date;
    var date = new Date(isoTime);

    var options = {
      month: "long",
      day: "numeric",
    };

    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function selectedFunction(id) {
    let filteredConversation = conversation.filter((item) => item._id == id);
    setToken("selectConversations", filteredConversation);
    setSelected(filteredConversation);
  }

  const lastMessage = (id) => {
    if (conversation && message) {
      let filteredConversation = conversation.filter((item) => item._id == id);
      if (filteredConversation) {
        let datta = filteredConversation[0];
        let filteredMessage = message.filter(
          (item) => item.conversationID == datta.conversationID
        );

        if (filteredMessage.length > 0) {
          return filteredMessage[0].text;
        } else {
          return "No messages yet";
        }
      }
    }
  };
  const SingleMessage = (id) => {
    if (conversation && message) {
      let filteredConversation = conversation.filter((item) => item._id == id);
      if (filteredConversation) {
        let datta = filteredConversation[0];
        let filteredMessage = message.filter(
          (item) => item.conversationID == datta.conversationID
        );

        return filteredMessage;
      }
    }
  };
  const fullscreenButton = () => {
    const item = fulScrrenItem.current;

    if (!fullScreen) {
      if (item.requestFullscreen) {
        item.requestFullscreen();
      } else if (item.mozRequestFullScreen) {
        // Firefox
        item.mozRequestFullScreen();
      } else if (item.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        item.webkitRequestFullscreen();
      } else if (item.msRequestFullscreen) {
        // IE/Edge
        item.msRequestFullscreen();
      }
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFullScreen(false);
    }
  };

  if (conversation && isAdmin && selectedConversation && message && socket) {
    function renderLogic(item, i) {
      if (item.senderRole !== isAdmin.data.userRole) {
        return (
          <div key={i} class="message-row other-message">
            <div class="message-content">
              <img src="/chat-img/images/user1.png" alt="Limon" />

              <div class="message-text">
                {item.text}
                {item.attachment ? (
                  <div class="image-chat-box">
                    <img src={item.attachment} />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div class="message-time">{niceDate(item.messageUpdateAT)}</div>
            </div>
            {item.sendedpackageID ? (
              <OfferCard
                socket={socket}
                id={item.sendedpackageID}
                msgData={item}
              />
            ) : (
              <div></div>
            )}
          </div>
        );
      } else if (item.senderRole == isAdmin.data.userRole) {
        return (
          <div key={i} class="message-row you-message">
            <div class="message-content">
              <div class="message-text">
                {item.text}
                {item.attachment ? (
                  <div class="image-chat-box">
                    <img src={item.attachment} />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div class="message-time">{niceDate(item.messageUpdateAT)}</div>
            </div>
            {item.sendedpackageID ? (
              <OfferCard
                socket={socket}
                id={item.sendedpackageID}
                msgData={item}
              />
            ) : (
              <div></div>
            )}
          </div>
        );
      }
    }
    function chatName(userid) {
      if (selectedConversation[0]) {
        if (selectedConversation[0].creatorID !== userid) {
          return selectedConversation[0].creatorID;
        } else if (selectedConversation[0].participantID !== userid) {
          return selectedConversation[0].participantID;
        } else if (
          selectedConversation[0].creatorRole !== isAdmin.data.userRole
        ) {
          return selectedConversation[0].creatorID;
        } else if (
          selectedConversation[0].participantRole !== isAdmin.data.userRole
        ) {
          return selectedConversation[0].participantID;
        } else {
          return isAdmin.data.userName;
        }
      } else {
        return "No conversation created yet";
      }
    }

    return (
      <div className="chat-container-max">
        <div ref={fulScrrenItem} id="chat-container">
          <div id="search-container">
            <input type="text" placeholder="Search" />
          </div>
          <div id="conversation-list">
            {conversation.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  selectedFunction(item._id);
                }}
                class={`conversation ${
                  selectedConversation[0]
                    ? selectedConversation[0]._id == item._id
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <img src="/chat-img/images/user1.png" alt="Sumit" />
                <div class="title-text">
                  {item.participantID !== isAdmin.data.userName
                    ? item.participantID
                    : item.creatorID}
                </div>
                <div class="created-date"> {niceDate(item.lastUpdatedAT)} </div>
                <div class="conversation-message">{lastMessage(item._id)}</div>
              </div>
            ))}
          </div>

          <div id="chat-title">
            <span>{chatName(isAdmin.data.userName)}</span>
            <i
              className="fa fa-square-o"
              onClick={fullscreenButton}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                marginRight: "5px",
              }}
            />
            <i
              className="fa fa-trash-o"
              onClick={deleteConversationHandler}
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
          </div>

          <div id="chat-message-list">
            {selectedConversation[0]
              ? SingleMessage(selectedConversation[0]._id).map((item, i) =>
                  renderLogic(item, i)
                )
              : []}
          </div>
          <div id="chat-button-left"></div>
          <div id="chat-button-right">
            {isAdmin.data.userRole == "instructor" ? (
              <ActionButton
                packageID={
                  selectedConversation[0] ? selectedConversation[0] : ""
                }
                clickHandler={sendMessageHandler}
                deleteHandler={deleteMessageHandler}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div id="chat-form">
            <label for="fileInput">
              <img
                style={{ cursor: "pointer" }}
                src="/chat-img/images/attachment.png"
                alt="Add"
              />
            </label>
            <input
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              id="fileInput"
              type="file"
            />

            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessageHandler("", false, false, 1, 0);
                }
              }}
              tabIndex="0"
              id="messageInput"
              type="text"
              placeholder="Type a message"
            />
            <i
              onClick={() => sendMessageHandler("", false, false, 1, 0)}
              style={{ fontSize: "24px", cursor: "pointer" }}
              className="fa fa-send"
            ></i>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatBox;
