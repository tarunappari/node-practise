const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./userSchema");

const app = express();
let port = process.env.PORT || 5000;
let MONGO_URI = `mongodb+srv://tarunappari23:9133Tarun23@cluster0.6a98vbn.mongodb.net/practiceNodeDB`;

//middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//mongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongoDB connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

  app.get('/',(req,res)=>{
    return res.send('yes this is port 5000')
  })

  //form practice
app.get("/register", (req, res) => {
    return res.send(`<html>
    <body>
        <h1>Registration form</h1>
        <form action="/register" method="post">
            <input type="text" placeholder="name" name="name">
            <input type="email" placeholder="email" name="email">
            <input type="password" placeholder="password" name="password">
            <button type="submit">submit</button>
        </form>
    </body>
    </html>`);
  });

  //below 2 middlewares were definetly need to read data
//this form data will be in a encoded format so this logs undefined
//app.use(express.json()) then req is converted into js obj
//app.use(express.urlencoded({extended: true,})) if obj in url encoded format then will extend to js obj
//better to use try catch model when async and I/O bound operations
app.post("/register", async (req, res) => {
    console.log(req.body);
    let {name,email,password} = req.body
  
    let userObj = new UserModel({
      name:name,
      email:email,
      password:password
    })
  
    try{
      let userDb = await userObj.save()
      console.log(userDb)
      return res.redirect('/login')
    }catch(err){
      console.log(err)
      res.send({
        status:500,
        message:'UserDb error',
        error:err,
      })
    }
  });

app.get('/login',(req,res)=>{
  return res.send(`<html>
  <body>
      <h1>Login form</h1>
      <form action="/login_form_submit" method="post">
          <input type="email" placeholder="email" name="email">
          <input type="password" placeholder="password" name="password">
          <button type="submit">submit</button>
      </form>
  </body>
  </html>`)
})

app.post('/login_form_submit',(req,res)=>{
  console.log(req.body);
  return res.send('login submitted page')
})






  app.listen(port, () => {
    console.log("server is running on port 5000");
  });