const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registration 
const registerUser = async(req , res)=>{
    try{
        //get data the sent 
        const {name , email , password , role} = req.body;

        // Check if the email already exist 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exist"});
        }

        // Jash the password  (10 = how many times to be scamble , more = safer but slower)
        const hashedPass = await bcrypt.hash(password, 10);
        
        // Create new user database
        const user =await User.create({
            name,
            email,
            password: hashedPass, // save the scrambled version, NOT the real one
            role
        });

        res.status(201).json({message : "User Registered Succesfully "});
    }catch(error){
        res.status(500).json({message : error.message})
    }
};

// Login

const loginUser = async(req , res)=> {
    try{
        // get email and password from  req
      const {email , password} = req.body;
      
      //find user in the database using email
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({message:"User not found"});
     }
     //Compare the password they typed with the hashed one in DB
     //bycrypt.compare return true or false
     const isPasswordCorrect = await bcrypt.compare(password , user.password);
     if(!isPasswordCorrect){
        return res.status(400).json({message:"Wrong Password"})
     }
     // Create Jwt token 
     //jwt.sign(payload , secret , options)
     //payload = data u strore insite the token 
     const token = jwt.sign(
        {id: user._id , role: user.role},   // what's inside the token
        process.env.JWT_SECRET,             // secret key to sign it 
        {expiresIn:"7d"}                    // token expires in 7 days
     );

     //Send the token back to user 
     res.status(200).json({
        token,
        user : {
        id:user._id,
        name : user.name,
        email :user.email,
        role: user.role
     }
    });
    }catch(error){
        res.status(500).json({message : error.message});
    }
};

module.exports = {registerUser,loginUser};
