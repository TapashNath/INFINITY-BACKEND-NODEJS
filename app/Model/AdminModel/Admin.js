const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      index: { unique: true, dropDups: true },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      maxlength:30,
    },
    token: {
      type: String,
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

adminSchema
  .pre("save", updateDate)
  .pre("update", updateDate)
  .pre("findOneAndUpdate", updateDate)
  .pre("findByIdAndUpdate", updateDate);

adminSchema.methods.toJSON = function () {
  var obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("admins", adminSchema);
