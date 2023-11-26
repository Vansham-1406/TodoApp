const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res
        .status(400)
        .json({ msg: "User already registered", status: false });
    }

    const newUser = await User.create({ email, password: hash });
    if (newUser) {
      const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
      });
      return res.status(201).json({ msg: "User created", status: true, token });
    }
  } catch (error) {
    return res.status(400).json({ status: error, msg: "user not registered" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await User.findOne({ email });
    if (!findEmail) {
      return res.status(400).json({ msg: "User not found", status: false });
    }

    const cmpPass = await bcrypt.compare(password, findEmail.password);
    if (!cmpPass) {
      return res.status(400).json({ msg: "Wrong Password", status: false });
    }

    const token = jwt.sign({ email }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    return res.status(200).json({ msg: "Logged in", status: true, token });
  } catch (error) {
    return res
      .status(400)
      .json({ status: error.message, msg: "user not logged in" });
  }
};

exports.mail = async (req, res) => {
    try 
    {
        const { email } = req.body;
        const user = await User.findOne({email});
        if(user)
        {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.mail_id,
                  pass: process.env.mail_pass,
                },
              });
            
              const min = 1000;
              const max = 9999;
            
              const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
              const pass = "TODOLIST " + randomNumber;
            
              var mailOptions = {
                from: process.env.mail_id,
                to: email,
                subject: "Change of password",
                text: `Password is : ${pass}`,
              };
            
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("mail sent successfully");
                }
              });
            
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(pass, salt);

              await User.findByIdAndUpdate({_id : user._id},{password : hash});
              return res.status(200).json({ msg: "Password changed", status: true });

        }
        return res.status(400).json({ msg: "User does not exist", status: false });

    } 
    catch (error) 
    {
        return res
        .status(400)
        .json({ status: error.message, msg: "user not logged in" });
    }


};
