const clientProfileModel = require("../models/clientProfileModel");
const instructorProfileModel = require("../models/instructorProfileModel");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

exports.clientLogin = (req, res) => {
  let userName = req.headers["userName"];
  clientProfileModel
    .findOne({ userName: userName }, { password: false })
    .then((data) => {
      // Create Auth Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        data: data,
      };
      let token = jwt.sign(Payload, process.env.SECRETKEY_JWT_WEBTOKEN);
      res
        .cookie("token_travel", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          status: "Alhamdulillah",
          token: token,
          data: data,
        });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

exports.instructorLogin = (req, res) => {
  let userName = req.headers["userName"];
  instructorProfileModel
    .findOne({ userName: userName }, { password: false })
    .then((data) => {
      // Create Auth Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        data: data,
      };
      let token = jwt.sign(Payload, process.env.SECRETKEY_JWT_WEBTOKEN);
      res
        .cookie("token_travel", token, {
          httpOnly: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          status: "Alhamdulillah",
          token: token,
          data: data,
        });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};
