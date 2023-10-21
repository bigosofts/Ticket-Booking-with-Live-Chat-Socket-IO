const bcrypt = require("bcrypt");
const clientProfileModel = require("../models/clientProfileModel");
const instructorProfileModel = require("../models/instructorProfileModel");

//encrypt the real password from req body to hashed password and send it the header req again so that response can save hashed password to the database.
exports.hashedPassword = (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 12, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      req.headers["passKey"] = hash;
      next();
    }
  });
};

exports.hashedPasswordCustom = async (pass) => {
  try {
    if (pass) {
      const hash = await bcrypt.hash(pass, 12);
      return hash;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err; // You can choose to throw the error or handle it differently
  }
};

//check the student user and password from body and compared hashed pass with the real password. then put authorize user to the header of request
exports.checkPasswordClient = (req, res, next) => {
  let userName = req.body.userName;
  let Password = req.body.password;
  clientProfileModel
    .findOne({ userName: userName, activeStatus: "active" })
    .then((userDetail) => {
      if (userDetail) {
        bcrypt.compare(Password, userDetail.password, (err, result) => {
          if (err) {
            console.log(err);
          } else if (result === true) {
            req.headers["userName"] = userName;
            next();
          } else {
            console.log("Password Verification Failed");
          }
        });
      } else {
        res.json({
          status: "nouser",
        });
      }
    });
};

//check the teacher user and password from body and compared hashed pass with the real password. then put authorize user to the header of request
exports.checkPasswordInstructor = (req, res, next) => {
  let userName = req.body.userName;
  let Password = req.body.password;
  instructorProfileModel
    .findOne({ userName: userName, activeStatus: "active" }, { password: true })
    .then((data) => {
      bcrypt.compare(Password, data.password, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result === true) {
          req.headers["userName"] = userName;
          next();
        } else {
          console.log("Password Verification Failed");
        }
      });
    })
    .catch((err) => {
      res.json({
        status: "noUser",
      });
    });
};
