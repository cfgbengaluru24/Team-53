import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import env from 'dotenv';
import pg from 'pg';
import passport from 'passport';
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import session from 'express-session';
import nodemailer from "nodemailer";
import { google } from "googleapis";

const app = express();
const saltrounds = 10;
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
env.config();

const db = new pg.Client({
    user:process.env.PGuser,
    password:process.env.PGpwd,
    host:process.env.PGhost,
    port:process.env.PGport,
    database:process.env.PGdb
});

db.connect();

app.use(
    session({
        secret:process.env.CFGsct,
        resave:false,
        saveUninitialized:true
    })
);
app.use(passport.initialize());
app.use(passport.session());

// app.post("/login",(req,res)=>{
//     console.log(req.body);
// })

passport.use(
    "local",
    new Strategy(async function verify(username,password,cb){
        try{
            console.log(username,password);
            const result = await db.query("SELECT * FROM login WHERE username = $1",
                [username]
            );
            
            if(result.rows.length > 0){
                const user = result.rows[0];
                const storedHash = user.pwd;
    
                bcrypt.compare(password,storedHash,async(err,valid)=>{
                    if(err){
                        // console.log("error");
                        return cb(err);
                    }else{
                        if(valid){
                            // console.log("hogya");
                            return cb(null,user);
                        }else{
                            // console.log("false case");
                            // regtext="Invalid Credentials";
                            return cb(null, false, { message: 'Invalid credentials' });
                        }
                    }
                });   
            }else{
                return cb(null, false, { message: 'User not found, please register' });
            }
        }catch(err){
            console.log(err);
        }
    })
);

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred", error: err });
        }
        if (!user) {
            return res.json({ message:"register"});
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.json({ message: "error"});
            }
            return res.json({ message: "loggedIn"});
        });
    })(req, res, next);
});

app.post("/register",async(req,res)=>{
    console.log(req.body);
    try{
        bcrypt.hash(req.body.password,saltrounds,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                await db.query("INSERT INTO login (username,email,pwd,phno) VALUES ($1,$2,$3,$4);",
                    [req.body.username,req.body.email,hash,req.body.phno]
                );
                // const msg = "Registered please login";
                // loginvar = "Login";
                res.json({message:"allowed"});
            }
        });    
    }catch(err){
        console.log(err);
    }
});

app.get("/admin",async(req,res)=>{
    try{
        const result = await db.query("SELECT special_requirement FROM inventory");
        if(result.rows.length === 0){
            res.json({category:"false"});
        }else{
            // console.log(result.rows[0]);
            res.json({category:result.rows[0].special_requirement});
        }
    }catch(err){
        console.log(err);
    }
})

async function checkMinimum(ratio,total){
    try{
        const result = await db.query("SELECT special_req_min FROM inventory");
        const current = await db.query("SELECT current_storage FROM inventory");
        const max = await db.query("SELECT max_storage FROM inventory");
        // console.log(current.rows[0]);
        if(total <= current.rows[0].current_storage && ratio >= result.rows[0].special_req_min && current.rows[0].current_storage < max.rows[0].max_storage){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.log(err);
    }
}

app.post("/inventory",async(req,res)=>{
    const total = req.body.quantity;
    const special = req.body.specialRequestQuantity;
    const ratio = special/total;
    const min = await checkMinimum(ratio,total);
    if(min){
        res.json({isAvailable:true});
    }else{
        res.json({isAvailable:false});
    }
})

app.post("/appoint",async(req,res)=>{
    // console.log(req.body);
    try{
        const response = await db.query("INSERT INTO appoint (email,dondate) VALUES($1,$2)",
            [req.body.email,req.body.donationdate]
        );
        res.json({status:"ok"});
    }catch(err){
        console.log(err);
    }
})

app.post("/update",async(req,res)=>{
    console.log(req.body);
    const storage = req.body.no;
    let requ = "false";
    if(req.body.requ == "") requ = "false";
    else requ = req.body.requ;
    const quant = req.body.quant;
    try{
        const result = await db.query(
            'UPDATE inventory SET current_storage = $1, special_requirement = $2,special_req_min = $3 WHERE id = 3',
            [storage, requ,quant]
        );
        res.json({ok:"ok"});
    }catch(err){
        console.log(err);
    }
})

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

async function sendMail(email,msg){
    try{
        const accessToken = oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAUTH2',
                user:'yashasvi8532@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })

        const mailOptions = {
            from:`Remainder <${email}>`,
            to:'yashasvichandra84@gmail.com',
            subject:'Message from Aspire and Glee',
            text:msg,
            html:`<p>${email}</p><p>${msg}</p>`
        }

        const result = await transport.sendMail(mailOptions); // as a promise
        return result;

    }catch(err){
        return err;
    }
}

app.post("/send",(req,res)=>{
    console.log("mail check");
    const email = "yashasvi8532@gmail.com";
    const msg = "Hello sir this message is in regarding with your gentle remainder for the donation";
    try{
        sendMail(email,msg)
        .then((result)=>{
            console.log("Mail Sent "+result);
            res.json({text:"Message sent"});
        });
    }catch(err){
        console.log(err.message);
    }
})

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});