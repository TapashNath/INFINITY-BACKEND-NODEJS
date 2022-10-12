const jwt = require("jsonwebtoken");
const jwtKey = "project";
const { response } = require("../Controller/Helper");
let decode;

module.exports.auth = async function authorization(req, resp, next) {
  if (req.headers && req.headers.authorization) {
    let authorizationData = req.headers.authorization.split(" ")[1];
    try {
      decode = jwt.verify(authorizationData, jwtKey);
      next();
    } catch (error) {
      response(1, resp, { data: [], message: error.message });
    }
  } else {
    response(1, resp, { data: [], message: "Authorization Token not found!" });
  }
};
