const AdminModel = require("../Model/AdminModel/Admin");
const jwt = require("jsonwebtoken");
const jwtKey = "project";
require("../Config");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { response } = require("../Controller/Helper");

const Encrypt = {
  cryptPassword: (password) =>
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),

  comparePassword: (password, hashPassword) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};

module.exports.login = async (req, resp) => {
  if (req.body.email) {
    if (req.body.password) {
      AdminModel.findOne({ email: req.body.email })
        .then(async (model) => {
          if (model.status) {
            if (
              await Encrypt.comparePassword(req.body.password, model.password)
            ) {
              jwt.sign({ model }, jwtKey, async function (err, token) {
                if (token) {
                  model.token = token;
                  response(0, resp, {
                    data: model,
                    message: model.name + " you are successfully login.",
                  });
                } else {
                  response(0, resp, {
                    data: [],
                    message: error.message,
                  });
                }
              });
            } else {
              response(0, resp, {
                data: [],
                message: "Password not mached",
              });
            }
          } else {
            response(0, resp, {
              data: [],
              message: "You are not active now. please contact to admin ",
            });
          }
        })
        .catch((error) => {
          response(0, resp, {
            data: [],
            message: error.message,
          });
        });
    } else {
      response(1, resp, {
        data: [],
        message: "Password not found (key => password)",
      });
    }
  } else {
    response(1, resp, {
      data: [],
      message: "Email address not found (key => email)",
    });
  }
};

module.exports.register = async (req, resp) => {
  if (req.body.email) {
    if (req.body.password) {
      if (req.body.name) {
        let user = await AdminModel.findOne({ email: req.body.email });
        if (user) {
          resp.send({
            error: true,
            message: "This Email Already Used try with another email",
          });
        } else {
          let user = await new AdminModel({
            email: req.body.email,
            password: await Encrypt.cryptPassword(req.body.password),
            name: req.body.name,
          });
          await user.save().then(async () => {
            response(0, resp, {
              data: user,
              message: "Register Successfully.",
            });
          });
        }
      } else {
        response(1, resp, {
          data: [],
          message: "Name not found (key => name)",
        });
      }
    } else {
      response(1, resp, {
        data: [],
        message: "Password not found (key => password)",
      });
    }
  } else {
    response(1, resp, {
      data: [],
      message: "Email address not found (key => email)",
    });
  }
};

module.exports.send_resetpass_link = async (req, resp) => {
  if (req.body.link) {
    let authorizationData = req.headers.authorization;
    let decode = jwt.verify(authorizationData, jwtKey);
  } else {
    response(true, resp, [], "Link not found. (key => link)");
  }
};

module.exports.reset_pass = async (req, resp) => {};
