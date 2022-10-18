const FatureModel = require("../Model/ProductModel/Fature");
const { response } = require("./Helper");

module.exports.fature_add = async (req, resp) => {
  if (req.body.name) {
    let fature = await FatureModel.findOne({ name: req.body.name });
    if (fature) {
      resp.send({
        error: true,
        message: "This Fature Name Already Used try with another name",
      });
    } else {
      let fature = await new FatureModel({
        name: req.body.name,
      });
      await fature.save().then(async () => {
        response(0, resp, {
          data: fature,
          message: "Fature Create Successfully.",
        });
      });
    }
  } else {
    response(1, resp, {
      data: [],
      message: "Name not found (key => name)",
    });
  }
};

module.exports.fature_edit = async (req, resp) => {
  console.log(req.body);
  if (req.body.name) {
    if (req.body.id) {
      FatureModel.findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          name: req.body.name,
        },
        { upsert: true, useFindAndModify: false }
      )
        .then((model) => {
          response(0, resp, {
            data: [],
            message: "Update Successfully",
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
  } else {
    response(1, resp, {
      data: [],
      message: "Name not found (key => name)",
    });
  }
};

module.exports.fature_status = async (req, resp) => {
  if (req.body.id) {
    FatureModel.findOne({ _id: req.body.id })
      .then((model) => {
        if (model.status === true) {
          FatureModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: false },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              FatureModel.findOne({ _id: model._id })
                .then((model) => {
                  response(0, resp, {
                    data: model,
                    message: "Fature inactive successfully",
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
          FatureModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: true },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              FatureModel.findOne({ _id: model._id })
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

module.exports.get_all_fature = async (req, resp) => {
  FatureModel.find({})
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

module.exports.get_all_active_fature = async (req, resp) => {
  FatureModel.find({ status: true })
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

module.exports.delete_fature_by_id = async (req, resp) => {
  if (req.body.id) {
    FatureModel.deleteOne({ _id: req.body.id })
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
