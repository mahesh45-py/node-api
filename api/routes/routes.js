const express = require('express');
const router = express.Router();
const Model = require('../models/model');


router.get('/getAll',async (req,res)=>{
    try {
        const data = await Model.find();
        res.status(200).json({
            status:true,
            message:'Data Fetched Successfully',
            data:data
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'An error occured while fetching data',
            error:error
        })
    }
    
})

router.get('/getById/:id',async (req,res)=>{
    try {
        const data = await Model.findById(req.params.id);
        res.status(200).json({
            status:true,
            message:'Data Fetched Successfully',
            data:data
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'An error occured while fetching data',
            error:error
        })
    }
})

router.post('/post', async (req,res)=>{
    const data = new Model({
        name:req.body.name,
        age:req.body.age
    })

    try {

        const dataToDave = await data.save();

        res.status(200).json({
            status:true,
            message:'Data added successfully',
            data:dataToDave
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'An Error occured while adding data',
            error:error
        })
    }
    
})

router.patch('/update/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const payload = req.body;
        const options = {new:true}
        const result = await Model.findByIdAndUpdate(id,payload,options)
        res.status(200).json({
            status:true,
            message:'Record updated successully',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'An error occured while updating',
            error:error
        })
    }
});

router.delete('/delete/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json({
            status:true,
            message:'Record deleted successully',
            data:data
        })
        
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'An error occured while deleting',
            error:error
        })
    }
})

module.exports = router;