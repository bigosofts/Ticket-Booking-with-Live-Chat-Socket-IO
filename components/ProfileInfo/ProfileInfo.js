"use client";
import { useState, useEffect } from "react";
import { getToken } from "@/helper/sessionHelper";

const ProfileInfo = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const isAdmin = getToken("token_travel");

    const array = [isAdmin.data];

    setData(array);
  }, []);
  if (data) {
   
    if (data[0].userRole == "client") {
      return (
        <div className="">
          {data.map((item, i) => (
            <div key={i} className="">
              <div className="image-wrapper">
                <a>
                  <img
                    style={{ height: "auto" }}
                    className="post-image-size"
                    src={item.profileImage}
                    alt=""
                  />
                </a>
              </div>
              <div className="status-container-post">
                {item.activeStatus == "active" ? (
                  <span className="green-status">Active</span>
                ) : (
                  <span className="red-status">Inactive</span>
                )}
              </div>
              <div className="absolute-post-card">
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Created at:{" "}
                  {new Date(item.clientCreatedDate).toLocaleDateString()}
                </div>
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Updated at:{" "}
                  {new Date(item.clientUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.userName}</h5>
                </a>

                <p className="item-display-p"> User Role: {item.userRole}</p>
              </div>

              <div
                id={item._id}
                style={{ marginTop: "-5px" }}
                className="post-item-package-5"
              >
                <p className="item-display-p">
                  {" "}
                  Client Email: {item.clientEmail}
                </p>
                <p className="item-display-p">
                  {" "}
                  Client Phone: {item.clientPhone}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (data[0].userRole == "instructor") {
      return (
        
        <div className="">
          {data.map((item, i) => (
            <div hey={i} className="">
              <div className="image-wrapper">
              <a>
                <img style={{height:"auto"}} 
                  className="post-image-size"
                  src={item.profileImage}
                  alt=""
                />
              </a>
              </div>
              <div className="status-container-post">
                {item.activeStatus == "active" ? (
                  <span className="green-status">Active</span>
                ) : (
                  <span className="red-status">Inactive</span>
                )}
              </div>
              <div className="absolute-post-card">
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Created at:{" "}
                  {new Date(item.instructorCreatedDate).toLocaleDateString()}
                </div>
                <div className="post-created-at">
                  <svg
                    aria-hidden="true"
                    className="svg-post-box"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Updated at:{" "}
                  {new Date(item.instructorUpdatedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="post-item-package-5">
                <a href="#">
                  <h5 className="item-display-h5">{item.userName}</h5>
                </a>
                <p className="item-display-p">
                  {" "}
                  Phone Number: {item.instructorPhone}
                </p>
              </div>

              <div
                id={item._id}
                style={{ marginTop: "-5px" }}
                className="post-item-package-5"
              >
                <p className="item-display-p">
                  {" "}
                  Email Address: {item.instructorEmail}
                </p>
                <p className="item-display-p">
                  {" "}
                  isAdmin: {JSON.stringify(item.isAdmin)}
                </p>

                <h5 className="item-display-p">Instructor Bio</h5>
                <p className="item-display-p-overflow">{item.instructorBio}</p>
              </div>
            </div>
          ))}
        </div>
    
      );
    }
  }
};

export default ProfileInfo;
