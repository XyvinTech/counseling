const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: Boolean, default: false },
    otp: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
