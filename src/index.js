const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser")
const app = express();
require("dotenv").config({path:"config/config.env"})
const port = process.env.PORT



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/contactdata',(req,res)=>{
    let data = req.body;
    
    let smtptransport  = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        
        auth: {
            user: `nafis.infranix098@gmail.com `,
            pass: 'fsvvskdexbdttorm'
        }
    });
    
    
 let mailOptions ={
        from:data.email,
        to:`nafis.infranix098@gmail.com`,
        subject:`Message from ${data.name}`,
        html:`
        <h3>Informations</h3>
        <ul style="border:1px solid #800800;color:#808880;list-style:none;width:450px">
        <li>Name:${data.name} </li>
        <li>Email:${data.email} </li>
        </ul>
        
        <h1>Message</h1>
        
        <h3 style="color:003300;">Message:${data.message} </h3>
        `
    }


    smtptransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
           
            res.send({ status: 0, msg: 'some error ' })
        } else {
           
            console.log('success');
            return res.send({ status:1, msg: "We have sent an email to your account" });
        }
    });
    smtptransport.close();
    
    
    })


 

app.get("/",(req,res)=>{
res.json("Welcome to the nodejs")
})

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
})
