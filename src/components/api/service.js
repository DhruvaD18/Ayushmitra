const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
// ////////////////////////////////////////// MONGOOSE CONNECT /////////////////////////////////
mongoose.connect("mongodb://localhost:27017/AllDataDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log('succesful')})
.catch(()=>{console.log('failure')})

//////////////////////////////////////ADDING PATIENT SCHEMA/////////////////////////////////
const patientSchema = new mongoose.Schema({
    name:String,
    email:String,
    aadhar:String,
    password:String,
})

const Patient = mongoose.model('patient',patientSchema)

///////////////////////////////////ADDING HOSPITAL SCHEMA////////////////////////////// 
const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    location: String,
    email: String,
    password: String,
    contact: String,
    beds: Number,
    staff: Number,
    specialties: [String],
});

const Hospital = mongoose.model('hospital',hospitalSchema)

/////////////////////////////////POST REQ FOR PATIENT/////////////////////////////////

app.post("/api/signUp-patient",async(req,res)=>{
    try{
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save()
    
        res.json({ message: "patient signed up successfully", patient: savedPatient });
    }catch(e){
        console.error(e);
        res.status(500).json({
          error: "Internal server error",
        });
    }
})

/////////////////////////POST REQ FOR HOSPITAL/////////////////////////////

app.post("/api/signUp-hospital",async(req,res)=>{
    try{
        const newHospital = new Hospital(req.body)
        const savedHospital = await newHospital.save()

        res.json({message:"successfully signed Up hospital", hospital: savedHospital})
    }catch(e){
        console.error(e);
        res.status(500).json({
          error: "Internal server error",
        });
    }
})

//////////////////////////////GET REQUEST FOR /api/check-patient-password ////////////////////////

app.get("/api/check-patient-password",async(req,res)=>{
    try{
        const email = req.query.value

        if(!email){
            return res.status(400).json({
                error: "Email is required in the query parameters.",
            });
        }

        const patient = await Patient.findOne({email:email}).exec()
        // console.log(patient)

        if(!patient){
            return res.json({ error: "User not found" });
        }

        const providedPassword = req.query.password

        if(!providedPassword){
            return res.status(400).json({
                error: "Password is required in the query parameters.",
            });
        }

        // console.log(providedPassword,patient.password)
        const isValidPassword = providedPassword===patient.password

        if (isValidPassword) {
            // Password is correct, return the entire user data
            res.json({ passwordMatch: true, patient });
        } else {
            // Password is incorrect
            res.json({ passwordMatch: false });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: "Internal server error",
        });
    }
    
})

///////////////////////////////GET REQ FOR /api/check-hospital-password/////////////////////

app.get("/api/check-hospital-password",async(req,res)=>{
    try{

        const email = req.query.value

        if(!email){
            return res.status(400).json({
                error: "Email is required in the query parameters.",
            });
        }

        const hospital = await Hospital.findOne({email:email}).exec()

        if(!hospital){
            return res.json({ error: "User not found" });
        }

        const providedPassword = req.query.password

        if(!providedPassword){
            return res.status(400).json({
                error: "Password is required in the query parameters.",
            });
        }

        const isValidPassword = providedPassword===hospital.password

        if (isValidPassword) {
            // Password is correct, return the entire user data
            res.json({ passwordMatch: true, hospital });
        } else {
            // Password is incorrect
            res.json({ passwordMatch: false });
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            error: "Internal server error",
        })
    }
})



app.listen(port, () => console.log(`Server is running on port ${port}`));






// const express = require('express');
// const hospitalApp = require('./add-hospital');
// const patientApp = require('./add-patient');
// const cors = require('cors');


// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:3000", "http://localhost:5000"], // Frontend URL
//     credentials: true, // Allows cookies and other credentials
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifies allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Specifies allowed headers
// }));
// // Mount each app under a specific route

// app.use('/patient', patientApp);
// app.use('/hospital', hospitalApp);

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));