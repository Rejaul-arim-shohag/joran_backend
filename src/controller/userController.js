const CreateToken = require("../Utilites/createToken");
const userModel = require("../model/User_model");

exports.userSignup = (req, res) => {
    userModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "error": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}


exports.UserLogin = async (req, res) => {
    try {
        let data = await userModel.aggregate([{ $match: req.body }, { $project: { _id: 0, first_name: 1, last_name: 1, email: 1, user_name: 1 } }])
        if (data.length > 0) {
            let token = await CreateToken(data[0]['email'])
            await userModel.updateOne({ email: data[0]['email'] },{ $set: { token: token } });
            res.status(200).json({ status: "success", token: token, data: data[0] })
        }
        else {
            res.status(200).json({ status: "unauthorized" })
        }
    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}

exports.UserLogout = async (req, res) => {
    try {
        let data = await userModel.aggregate([{ $match: req.body  }])
        if (data.length > 0) {
            await userModel.updateOne({ email: data[0]['email'] },{ $set: { token: "" } });
            res.status(200).json({ status: "Logout Success"})
        }
        else {
            res.status(200).json({ status: "unauthorized" })
        }
    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}