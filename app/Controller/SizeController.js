const SizeModel = require("../Model/ProductModel/Size");
const { response } = require("./Helper");

module.exports.size_add = async (req, resp) => {
  if (req.body.name) {
    let fature = await SizeModel.findOne({ name: req.body.name });
    if (fature) {
      resp.send({
        error: true,
        message: "This Fature Name Already Used try with another name",
      });
    } else {
      let fature = await new SizeModel({
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

module.exports.size_edit = async (req, resp) => {
  console.log(req.body);
  if (req.body.name) {
    if (req.body.id) {
      SizeModel.findOneAndUpdate(
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
            data: model,
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

module.exports.size_status = async (req, resp) => {
  console.log(req.body);
  if (req.body.id) {
    SizeModel.findOne({ _id: req.body.id })
      .then((model) => {
        if (model.status === true) {
          SizeModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: false },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              response(0, resp, {
                data: [],
                message: "Size inactive successfully",
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
          SizeModel.findOneAndUpdate(
            {
              _id: req.body.id,
            },
            { status: true },
            { upsert: true, useFindAndModify: false }
          )
            .then((model) => {
              SizeModel.findOne({ _id: model._id })
                .then(() => {
                  response(0, resp, { 
                    data: [],
                    message: "Size active successfully",
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

module.exports.get_all_size = async (req, resp) => {
  SizeModel.find({})
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

module.exports.get_all_active_size = async (req, resp) => {
  SizeModel.find({ status: true })
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

module.exports.delete_size_by_id = async (req, resp) => { 
  console.log(req.body);
  if (req.body.id) {
    SizeModel.deleteOne({ _id: req.body.id })
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
