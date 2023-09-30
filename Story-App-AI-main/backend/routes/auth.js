const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER user and save user in db
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "dsajdja78"
    ).toString(),
  });

  try {
    if(await User.findOne({email:req.body.email})){
    //user exists in db? **await
     const user = await User.findOne(
          {
              email: req.body.email
          }
      );
      console.log("user aldready exits.No problem.Loggin in right away.",user)
             //if user exists=> decrypt hashed pswd in db and get decrypted correct pswd
      const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            "dsajdja78"
        );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      //compare it to user response pswd
      const inputPassword = req.body.password;
      originalPassword !== inputPassword && 
      res.status(401).json("Wrong Password");
     //persist login=>accessToken=>jwt
        const accessToken = jwt.sign(
            {id: user._id,
            isAdmin: user.isAdmin,
            },
            "ndfssf6473",
            {expiresIn:"3d"}
        );
        const { password, ...others } = user._doc;  
        res.status(201).json({...others, accessToken});  
    }
    else{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
  
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;