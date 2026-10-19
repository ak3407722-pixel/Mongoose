const express=require("express");
const bcrypt=require("bcrypt");
const {UserModel,TodoModel}=require("./db");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const JWT_SECRET="Iloveyou";
mongoose.connect("")

const app=express();
app.use(express.json());

app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    const hashpassword=await bcrypt.hash(password,5);
    console.log(hashpassword);
    await UserModel.create({
        email:email,
        password:hashpassword,
        name:name
    })
    res.json({
        message:"you are logged in"
    })

});

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user= await UserModel.findOne({
        email:email,
     
    });
    const passwordMatch=await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()

},JWT_SECRET);
res.json({
    token:token
})
    }else{
        res.status(403).json({
            message:"Incorrect Credential"
        })
    }
});
function auth(req,res,next){
  const token=req.headers.token;
  const decodeData=jwt.verify(token,JWT_SECRET);
  if(decodeData){
    req.userId=decodeData.id;
    next();
  }
  else{
    res.status(403).json({
        message:"Incorrect Credential"
    })
  }
}
app.post("/todo",auth,function(req,res){
  const userId=req.userId;
  res.json({
    userId:userId
  })
});

app.get("/todos",auth,function(req,res){
    const userId=req.userId;
     res.json({
        userId:userId
  })
});
app.listen(3000);