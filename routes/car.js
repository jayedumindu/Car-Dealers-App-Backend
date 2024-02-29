const express = require('express');
const router = express.Router();

const Car = require('../model/car.model');


router.get('/',async (req,res)=>{
  try{
      const response=await Car.find();
      res.json(response)
  }catch (e) {
      res.send('error :'+e)
  }
})
router.get('/:date',async (req,res)=>{
    try{
        const car=await Car.find();
        let resp=[];
        for (const c of car){
            if(req.params.date===c.date){

                //const cars=await Car.findById(c._id);
                resp.push(c)
            }
        }
        res.send(resp)
    }catch (e) {
        res.send('error :'+e)
    }
})

router.post('/',async (req,res)=>{
    const cars=new Car({
        regNo:req.body.regNo,
        date:req.body.date,
        location:req.body.location,
        description:req.body.description,
        img:req.body.img
    })
    console.log(cars)
    try{
        const response=await cars.save();
       res.json(response)
    }catch (e) {
        res.send('error :'+e)
    }
})
router.put('/',async (req,res)=>{
    try{
        const cars=await Car.find();
        for (const c of cars){
            if(req.body.regNo===c.regNo){
                const car=await Car.findById(c._id)
                car.regNo=req.body.regNo;
                car.date=req.body.date;
                car.location=req.body.location;
                car.description=req.body.description;
                car.img=req.body.img;
                console.log(car)
                const response=await car.save();
                res.send(response)
            }
        }

    }catch (e) {
        res.send('error :'+e)
    }
})
router.delete('/' , async (req,res)=>{
    try{
        const cars=await Car.find();
        for (const c of cars){
            if(req.body.regNo===c.regNo){
               const dlt=await Car.findById(c._id);

               const response=await dlt.remove();
               res.send(response)
            }
        }
    }catch (e) {
        res.send('error :'+e)
    }
})

module.exports = router;