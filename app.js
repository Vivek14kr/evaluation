
const express = require("express");
const mongoose = require("mongoose");

const connect =()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri")
}

const app = express();

app.use(express.json())


const jobSchema = new mongoose.Schema({
    job_name:{
        type:String,
        required: true
    },
    city_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cities",
        required: true
    },
    skill_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"skills",
      required:true
    },
    workfromhome:{
        type:Boolean,
        required: true
    },
    noticeperiod:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"companies",
        required: true
    }
},{
    versionKey:false,
    timestamps: true
})


const job = mongoose.model("jobs", jobSchema);

app.post("/jobs", async (req, res) => {
    try {
        const jobe = await job.create(req.body);
        return res.status(201).send(jobe);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

app.get("/jobs", async (req, res) => {
    try {
        const jobdata = await job.find({}).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
        return res.send({
            jobdata
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})
app.get("/jobs", async (req, res) => {
    try {
        const jobdata = await job.find({}).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
        return res.send({
            jobdata
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

app.get("/jobs/sort", async (req, res) => {
    try {
        const jobdata = await job.find({}).sort({rating:1}).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
        return res.send({
            jobdata
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})
app.get("/jobs/wfh", async (req, res) => {
    try {
        const jobdata = await job.find({workfromhome:true}).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
        return res.send({
            jobdata
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})
app.get("/jobs/noticeperiod", async (req, res) => {
    try {
        const jobdata = await job.find( {
            noticeperiod: {$gte:2}
        }).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
        return res.send({
            jobdata
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

app.get("/jobs/cities/:id/skills/:id", async(req, res)=>{
    try{
        const citiessl = await city.findById(req.params.id).lean().exec();
        const skillss = await skill.findById(req.params.id).lean().exec();
    
                const jobdata = await job.find({
                    city_id : citiessl,
                    skill_id: skillss
                }).populate("city_id").populate("skill_id").populate("company_id").lean().exec();
                return res.send({
                    jobdata
                })
            } catch (e) {
                return res.status(500).json({
                    message: e.message,
                    status: "Failed"
                })
            }
        })


const citySchema = new mongoose.Schema({
    cityname:{
        type:String,
        required:true
    }
},{
     versionKey: false,
         timestamps: true
})


const city = mongoose.model("cities", citySchema);

app.post("/cities", async(req, res)=>{
    try{
        const cityname = await city.create(req.body);
        return res.status(201).send(cityname);
    } catch(e){
        return res.status(500).json({
            message:e.message,
            status: "Failed"
        })
    }
})

app.get("/cities",async(req, res)=>{
       try {
           const cityname = await city.find().lean().exec();
           return res.send({
               cityname
           })
       } catch (e) {
           return res.status(500).json({
               message: e.message,
               status: "Failed"
           })
       }
})

const skillSchema = new mongoose.Schema({
    skillname: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})


const skill = mongoose.model("skills", skillSchema);

app.post("/skills", async (req, res) => {
    try {
        const skillname = await skill.create(req.body);
        return res.status(201).send(skillname);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

app.get("/skills", async (req, res) => {
    try {
        const skillname = await skill.find().lean().exec();
        return res.send({
            skillname
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    sector:{
        type:String,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
})


const company = mongoose.model("companies", companySchema);

app.post("/companies", async (req, res) => {
    try {
        const name = await company.create(req.body);
        return res.status(201).send(name);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})

app.get("/companies", async (req, res) => {
    try {
        const name = await company.find().lean().exec();
        return res.send({
            name
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message,
            status: "Failed"
        })
    }
})








app.listen(2234, async function(){
    await connect();
    console.log("listening")
})