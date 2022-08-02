const Users = require("../models/Users");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const {generateJWT} = require ("../helpers/generate-JWT");


const getUsers = async (req,res) =>{
    try {
        const userData =  await Users.find({})
        return res.json({results: userData, ok:true})
    } catch (error) {
        return res.status(500).json({ msg: error.message, ok: false })
    }
}

const signUp = async(req,res) =>{
    try{
        const {username, image, presentation, email, password, role=0} = req.body;
        const usersFound = await Users.find({email})

        if(usersFound.length > 0){
            res.status(400).json(
                {
                    msg:"Email already exists. Try with another",
                    ok:false
                }
            )
        }else{
            const encryptedPass = await encryptPassword(password)
            const token = await generateJWT({username,email})
    
            const newUser = await Users.create({username,image,presentation,email,password:encryptedPass,role})


            res.status(200).json({results: {username,image,presentation},token:token, ok:true})
        }


    }catch(error){
        res.status(500).json({msg:error.message, ok:false})
    }
}

const logIn = async(req,res)=>{

    try {
        const {email, password} = req.body;
        const dbUser = await Users.findOne({email})

        if(dbUser){
            const passValidation = await comparePassword(password,dbUser.password)

            if(passValidation){
                const token = await generateJWT({username: dbUser.username, email: dbUser.email},)
                res.status(200).json({token:token,results:dbUser,ok:true})
            }else{
                res.status(400).json({msg:"Incorrect email or password. Please, Try again"})
            }
        }else{
            res.status(400).json({msg:"Incorrect email or password. Please, Try again"})
        }
    } catch (error) {
        res.status(500).json({msg:error.message, ok:false})
    }
}

module.exports = {getUsers, signUp, logIn}