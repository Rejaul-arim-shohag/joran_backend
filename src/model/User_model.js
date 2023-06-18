const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    user_name: { type: String, unique: true},
    password: { type: String },
    token:{ type: String },
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const userModel = mongoose.model("users", Schema);
module.exports = userModel;