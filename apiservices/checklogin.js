const axios = require("axios");

exports.isAdmin = async () => {
  const response = await axios.get("/apis/v1/isAdmin", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.data;
};

exports.clientLogin = async (userName, password) => {
  const payloaddata = {
    userName,
    password,
  };
  const res = await fetch("/apis/v1/client-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloaddata),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

exports.instructorLogin = async (userName, password) => {
  const payloaddata = {
    userName,
    password,
  };
  const res = await fetch("/apis/v1/instructor-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloaddata),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

exports.logout = async () => {
  const res = await fetch("/apis/v1/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
