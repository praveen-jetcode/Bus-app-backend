var express = require("express");
var router = express.Router();
var WORKER  = require("../models/workers");


router.post("/",  async (req, res) => {
    try {
      let data = new WORKER(req.body);
      console.log(data,'data')
      if (data) {
        await data.save();
        res.status(200).json(data);
      } else {
        throw error;
      }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
  });



  router.get("/", async (req, res) => {
    try {
      let data = await WORKER.find();
      if (data) {
        res.status(200).json(data);
      } else {
        throw ErrorHandler.InternalServerError;
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  });
  

  router.put('/update/:id',async(req,res)=>{
    let id = req.params.id
    let body = req.body
    try{
      let data = await WORKER.findByIdAndUpdate(id,body, {new:true})
      if(data){
        res.status(200).json(data)
      }else{
        throw ErrorHandler.NotFound;
      }
    }catch(err){
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  })

  router.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id
    let body = req.body
    try{
      let data = await WORKER.findByIdAndDelete(id,body)
      if(data){
        res.status(200).json({message:'deleted'})
      }else{
        throw ErrorHandler.NotFound;
      }
    }catch(err){
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  })
  
  router.get("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      if (!id) {
        return res.status(400).json({
          message: "invalid WORKER id",
        });
      }
      let data = await WORKER.findById(id);
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
  

  
  module.exports = router;
