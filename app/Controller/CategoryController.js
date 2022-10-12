const CategoryModel = require("../Model/ProductModel/Category");
const { response } = require("./Helper");
const multer = require("multer");
const path = require("path");


module.exports.category_add = async (req, resp) => {
  if (req.body.image) {
    if (req.body.name) { 
      
    } else {
      response(1, resp, {
        data: [],
        message: "Name not found (key => name)",
      });
    }
  } else {
    response(1, resp, {
      data: [],
      message: "Image not found (key => image)",
    });
  }
};

// module.exports.register = async (req, resp) => {
//   if (req.body.email) {
//     if (req.body.password) {
//       if (req.body.name) {
//         let user = await AdminModel.findOne({ email: req.body.email });
//         if (user) {
//           resp.send({
//             error: true,
//             message: "This Email Already Used try with another email",
//           });
//         } else {
//           let user = await new AdminModel({
//             email: req.body.email,
//             password: await Encrypt.cryptPassword(req.body.password),
//             name: req.body.name,
//           });
//           await user.save().then(async () => {
//             response(0, resp, {
//               data: user,
//               message: "Register Successfully.",
//             });
//           });
//         }
//       } else {
//         response(1, resp, {
//           data: [],
//           message: "Name not found (key => name)",
//         });
//       }
//     } else {
//       response(1, resp, {
//         data: [],
//         message: "Password not found (key => password)",
//       });
//     }
//   } else {
//     response(1, resp, {
//       data: [],
//       message: "Email address not found (key => email)",
//     });
//   }
// };

// module.exports.send_resetpass_link = async (req, resp) => {
//   if (req.body.link) {
//     let authorizationData = req.headers.authorization;
//     let decode = jwt.verify(authorizationData, jwtKey);
//   } else {
//     response(true, resp, [], "Link not found. (key => link)");
//   }
// };

// module.exports.reset_pass = async (req, resp) => {};
