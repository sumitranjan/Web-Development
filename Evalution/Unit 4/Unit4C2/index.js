const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/bank")
}
// user schema
//step1: Create User schema

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        middleName:{type:String},
        lastName:{type:String,required:true},
        age:{type:Number,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true},
        gender:{type:String,default:"Female"}, 
        type:{type:String,default:"Customer"}
    },
    {
        versionKey:false,
        timestamps:true,
    }
    )

//step2: Create the Model 
const User = mongoose.model("user",userSchema)

//step1: Craete BranchDetail Schema
const branchDetailSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        MICR:{type:String,required:true},
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
//step2: Create the Model 
const Branch = mongoose.model("branch",branchDetailSchema)

//step1: Create Master Account
const masterAccountSchema  = new mongoose.Schema(
    {
        balance:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
//step2: Create the Model 
const Master = mongoose.model("master",masterAccountSchema)

//Step 1: Create Saving Account
const savingsAccountSchema = new mongoose.Schema(
    {
        account_no:{type:Number,required:true,unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
//step2: Create the Model 
const Saving = mongoose.model("saving",savingsAccountSchema)


//Step1: create Fixed Account 
const fixedAccountSchema = new mongoose.Schema(
    {
        account_no:{type:Number,required:true,unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Date,required:true},
        maturityDate:{type:Date,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
    },
    {
        versionKey:false,
        timestamps:true,
    }
)
//step2: Create the Model 
const Fixed = mongoose.model("fixed",fixedAccountSchema)

// CRUDS 

// User CRUD 
app.post("/users",async (req, res) => {
    try{
        const users = await User.create(req.body)
        return res.status(200).send(users)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

// Branch Cruds
app.post("/branchs",async (req, res) => {
    try{
        const branch = await Branch.create(req.body)
        return res.status(200).send(branch)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

// Master Crud 
app.get("/master",async (req, res) => {
    try{
        const master = await Master.find().populate({path:"userId",select:["firstName","middleName","lastName","email","gender","age","address"]}).lean().exec()
        

        req.send(master)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

//Master Cruds
app.post("/master",async (req, res) => {
    try{
        const master = await Master.create(req.body)
        return res.status(200).send(master)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

app.get("/master",async (req, res) => {
    try{
        const master = await Master.find().populate({path:"userId",select:["firstName","middleName","lastName","email","gender","age","address"]}).lean().exec()
        

        req.send(master)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

// Saving Cruds

app.post("/saving",async (req, res) => {
    try{
        const saving = await Saving.create(req.body)
        return res.status(200).send(saving)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})


//Fixed CRUDS
app.post("/fixed",async (req, res) => {
    try{
        const fixed = await Fixed.create(req.body)
        return res.status(200).send(fixed)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})

app.delete("/fixed",async (req, res) => {
    try{
        const fixed = await Fixed.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(fixed)
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
})


app.listen(5000,async()=>{
    try{
        await connect()
    }
    catch(err){
        console.log(err)
    }
    console.log("Listening to port 5000")
})