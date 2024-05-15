//index.js

const express = require("express")
const app = express()

const {mongoose} = require("mongoose")

const {User} = require("./schema.js")

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require("cors")
app.use(cors())

const bcrypt = require('bcrypt');



const port = process.env.PORT || 8000

async function DBconnection(){
    try{
        await mongoose.connect("mongodb+srv://KeerthikkaS:0o8u6t4e2q@cluster0.ka4dlmb.mongodb.net/Learning_App?retryWrites=true&w=majority&appName=Cluster0")
        app.listen(port,function(){
            console.log(`Connected to DB,Listening to port : ${port}`)
        })
    }
    catch(error){
        console.log("Couldn't Establish Connection to DB")
    }
}
DBconnection()

app.get("/",function(request,response){
    response.send("Welcome to Learning APP")
})

// **User Signup** //

app.post("/signup",async function(request,response){
    try{
        const emailid = request.body.emailid
        const password = request.body.password

        const oldUser = await User.findOne({ emailid });
        if (oldUser) {
            return response.status(409).send("User Already Exist. Please Login");
        }
        encryptedUserPassword = await bcrypt.hash(password, 10);
        await User.create({
            "username":request.body.username,
            "emailid":request.body.emailid,
            "password":encryptedUserPassword
        })
        response.status(201).json({"status":"success","msg":"User Added"})
        console.log(request.body)    
    }
    catch(error){
        console.error("Error during signup:", error);
        response.status(500).json({"status":"failure","msg":"couldn't signup","Error": error})
    }
})

// **User Login** //

app.post("/login", async (request, response) => {
    try {
        const emailid = request.body.emailid
        const password = request.body.password
        if (!(emailid && password)) {
            return response.status(400).send("Email and password are required.");
        }

        const user = await User.findOne({ emailid });
        if (!user) {
            return response.status(400).send("User not found.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(400).send("Password is Incorrect.");
        }
        console.log("Login Successful!!!");
        response.status(200).json({ 
            message: "Login successful", 
            username: user.username
          });
    } 
    catch (error) {
        console.error("Error during login:", error);
        return response.status(500).json({ status: "failure", msg: "Couldn't login now. Please try again later." });
    }
});
