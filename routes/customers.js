const express = require("express");
const authRoutes = express.Router();
var CUSTOMER = require("../models/customers");
const { hashGenerate } = require("../helpers/hashing");
const { hashValidator } = require("../helpers/hashing");
const { tokenGenerate, validateToken } = require("../helpers/tokens");


authRoutes.post("/signup",async (req, res) => {
    try {
       let hash = await hashGenerate(req.body.password);
       console.log(hash,'hash')
      hash = req.body.password
      let user = new CUSTOMER(req.body);
      if (user) {
        await user.save();
        // await sendSMS(randomOTP, {});
        let token =await tokenGenerate(user);
        res.status(200).json({
          message: "success",
          token,
        });
      } else {
        throw ErrorHandler.BadRequest;
      }
    } catch(err){
        console.log(err)
        res.status(500).json({ message: err.message });
      }

  });




  authRoutes.post("/signin", async (req, res) => {
    try {
      const existingUser = await CUSTOMER.findOne({ email: req.body.email });
      console.log(existingUser)
      if (!existingUser) {
        res.send("No Email find");
      } else {
        const checkUser = await hashValidator(
          req.body.password,
          existingUser.password
        );
        if (!checkUser) {
          res.send("Password invalid");
        } else {
          const token = await tokenGenerate(existingUser);
          res.status(200).json({ token: token });
        }
      }
    } catch (err) {
      res.status(err.status).json({
        message: err.message,
      });
    }
  });



  


  authRoutes.get("/",async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      let data = await CUSTOMER.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await CUSTOMER.countDocuments();
      res.json({
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      res.status(err.status).json({message: err.message,});
    }
  });




  authRoutes.get("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      if (!id) {
        return res.status(400).json({
          message: "invalid BUS id",
        });
      }
      let data = await CUSTOMER.findById(id);
      if (data) {
        res.status(200).json(data);
      } else {
        throw ErrorHandler.NotFound;
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = authRoutes;