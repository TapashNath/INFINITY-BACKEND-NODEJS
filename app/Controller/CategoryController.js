const CategoryModel = require("../Model/ProductModel/Category");
const { response } = require("./Helper");

module.exports.category_add = async (req, resp) => {
  // if (req.file.filename) {   
  // const image = `${req.protocol}://${req.get("host")}/` + req.file.path;
  const image = "image";
    if (req.body.name) {
       let category = await CategoryModel.findOne({ name: req.body.name });
       if (category) {
         resp.send({
           error: true,
           message: "This Category Name Already Used try with another name",
         });
       } else {
         let category = await new CategoryModel({
           name: req.body.name,
           image: image,
           name: req.body.name,
         });
         await category.save().then(async () => {
           response(0, resp, {
             data: category,
             message: "Category Create Successfully.",
           });
         });
       }
    } else {
      response(1, resp, {
        data: [],
        message: "Name not found (key => name)",
      });
    }
  // } else {
  //   response(1, resp, {
  //     data: [],
  //     message: "Image not found (key => image)",
  //   });
  // }
};

module.exports.category_edit = async (req, resp) => {
  // if (req.file.filename) {
  //   const image = `${req.protocol}://${req.get("host")}/` + req.file.path;
    const image = "image";
    if (req.body.name) {
      let category = await CategoryModel.findOne({ name: req.body.name });
      if (category) {
        resp.send({
          error: true,
          message: "This Category Name Already Used try with another name",
        });
      } else {
        let category = await new CategoryModel({
          name: req.body.name,
          image: image,
          name: req.body.name,
        });
        await category.save().then(async () => {
          response(0, resp, {
            data: category,
            message: "Category Create Successfully.",
          });
        });
      }
    } else {
      response(1, resp, {
        data: [],
        message: "Name not found (key => name)",
      });
    }
  // } else {
  //   response(1, resp, {
  //     data: [],
  //     message: "Image not found (key => image)",
  //   });
  // }
};

module.exports.category_status = async (req, resp) => {
  if (req.body.id) {
    CategoryModel.findOne({ _id: req.body.id })
      .then((model) => {
        if (model.status === true) {
          CategoryModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: false },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              CategoryModel.findOne({ _id: model._id })
                .then((model) => {
                  response(0, resp, {
                    data: model,
                    message: "Category inactive successfully",
                  });
                })
                .catch((error) => {
                  response(1, resp, {
                    data: [],
                    message: error.message,
                  });
                });
            })
            .catch((error) => {
              response(1, resp, {
                data: [],
                message: error.message,
              });
            });
        }
        if (model.status === false) {
          CategoryModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: true },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              CategoryModel.findOne({ _id: model._id })
                .then((model) => {
                  response(0, resp, {
                    data: model,
                    message: "Role active successfully",
                  });
                })
                .catch((error) => {
                  response(1, resp, {
                    data: [],
                    message: error.message,
                  });
                });
            })
            .catch((error) => {
              response(1, resp, {
                data: [],
                message: error.message,
              });
            });
        }
      })
      .catch((error) => {
        response(1, resp, {
          data: [],
          message: error.message,
        });
      });
  } else {
    response(1, resp, {
      data: [],
      message: "ID not found (key => id)",
    });
  }
};

module.exports.get_all_category = async (req, resp) => {
  CategoryModel.find({})
    .then((model) => {
      response(0, resp, {
        data: model,
        message: "Data get Successfully.",
      });
    })
    .catch((error) => {
      response(1, resp, {
        data: [],
        message: error.message,
      });
    });
};

module.exports.get_all_active_category = async (req, resp) => {
  CategoryModel.find({ status: true })
    .then((model) => {
      response(0, resp, {
        data: model,
        message: "Data Get Successfully.",
      });
    })
    .catch((error) => {
      response(1, resp, {
        data: [],
        message: error.message,
      });
    });
};

module.exports.delete_category_by_id = async (req, resp) => {
  if (req.body.id) {
    CategoryModel.deleteOne({ _id: req.body.id })
      .then((model) => {
        response(0, resp, {
          data: model,
          message: "Data delete successfully",
        });
      })
      .catch((error) => {
        response(1, resp, {
          data: [],
          message: error.message,
        });
      });
  } else {
    response(1, resp, {
      data: [],
      message: "ID not found (key => id)",
    });
  }
};