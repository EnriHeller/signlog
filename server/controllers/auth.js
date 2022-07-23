const Users = require("../models/Users")

const getUsers = async (req,res) =>{
    try {
        const userData =  await Users.find({})

        return res.json({results: userData, ok:true})
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false });
    }
}

module.exports = {getUsers}