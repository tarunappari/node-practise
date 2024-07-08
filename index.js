const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./userSchema");

const app = express();
let port = process.env.PORT || 8000;
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

//just checked whether api working or not
app.get("/home", (req, res) => {
  console.log("get request frmm home");
  return res.send("this is homepage");
});

//used this api to practice queries
app.get("/api", (req, res) => {
  console.log(req);
  //req.query gives that are after ?
  //req.query (api?key=100 || api?key1=100&&key2=200&&key3=300 || api?key=100,200,300)
  res.send("hello");
});

//used this api1 to practice params
app.get("/api1/:id", (req, res) => {
  console.log(req.params);
  let id = req.params.id; //here dynamic routing was hpning we are giving the id in the
  return res.send(`great api1/${id}`); // api dynamically we can change it to anything
});

//using dynamic and hard coded params
app.get("/api2/:id/dev", (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  return res.send(`successfully api2/${id}/dev`);
});

//using dynamic and hard coded params
app.get("/api3/:id/:dev", (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  let dev = req.params.dev;
  return res.send(`successfully api3/${id}/${dev}`);
});

//form practice
app.get("/form-submit", (req, res) => {
  return res.send(`<html>
  <body>
      <h1>this is form</h1>
      <form action="/form-submit" method="post">
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
app.post("/form-submit", async (req, res) => {
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
    return res.send({
      status:200,
      message:'user created successfully',
      data:userDb
    })
  }catch(err){
    console.log(err)
    res.send({
      status:500,
      message:'UserDb error',
      error:err,
    })
  }
});

app.listen(port, () => {
  console.log("server is running on port 8000");
});
