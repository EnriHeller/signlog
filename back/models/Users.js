const moongose = require("../config/database")

const Users = moongose.model("Users", {
    username:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    presentation:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        required: true,
        default: 0
    }
} )

/* UserSchema.methods.encryptPassword = encryptPassword
UserSchema.methods.comparePassword = comparePassword */

module.exports = Users