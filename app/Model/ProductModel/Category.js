const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

var updateDate = function (next) {
  var self = this;
  self.updated_at = new Date();
  if (!self.created_at) {
    self.created_at = new Date();
  }
  next();
};

categorySchema
  .pre("save", updateDate)
  .pre("update", updateDate)
  .pre("findOneAndUpdate", updateDate)
  .pre("findByIdAndUpdate", updateDate);

categorySchema.methods.toJSON = function () {
  var obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("categorys", categorySchema);
