const router = require('express').Router();
const Student = require('../models/Student');
const Admin=require("../models/Admin");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 

router.post('/student', async (req, res) => {
    try {
        const { name, class: studentClass, gender, batchYear } = req.body;

        const newStudent = new Student({ name, class: studentClass, gender, batchYear });

        await newStudent.save();

        res.json(newStudent);

    } catch (error) {
        res.status(500).json({ message: "Error creating student", error: error.message });
    }
});
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
});
router.get('/students/:id',async(req,res)=>{

    try{

        const student=await Student.findById(req.params.id)
        if(!student) return res.status(404).json({message:"student not found"})
            res.json(student);
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }
})

router.delete('/students/:id', async (req, res) => {
    try {

        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student Deleted" });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
});

router.put("/students/:id", async (req, res) => {

  console.log("Received update data:", req.body); 

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

router.post("/login",async(req,res)=> {

    const {username,password}=req.body;
    
    try {
        const admin=await Admin.findOne({username})


        if(!admin) return res.status(404).json({message:"Admin not found"})

            const isMatch=await bcrypt.compare(password,admin.password)
            if(!isMatch) return res.status(400).json({Message:"Invalid creadentials"})

                const token=jwt.sign({id:admin._id},"SECRET_KEY",{expiresIn:"1h"})
                res.json({token});
    }
    catch(error) {
        res.status(500).json({message:error.message});
    }
})

module.exports = router;

