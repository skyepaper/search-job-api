const express = require("express");
const mongoose=require('mongoose');

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app=express();
app.use(express.json());
app.use(cors());

server = require('http').createServer(app);

mongoose.connect('mongodb+srv://borismirevbm:2YacEBc3qgz4OiLJ@blocks.6ud9dig.mongodb.net/search-job?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to DB'))
  .catch(console.error);

const Company=require('./models/Company');

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  'force new connection': true 
});
server.listen(3002);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', function () {
    console.log(`User DisConnected: ${socket.id}`);
});
  
});

app.get('/companies', cors(), async(req,res)=>{  

  const companies=await Company.find();
  res.json(companies);
});

app.post('/company/new', async (req,res)=>{

  const company = new Company({
     name:req.body.name,
      city:req.body.city,
      logo:req.body.logo,
      link:req.body.link,
      email:req.body.email
  });
  company.save();
  res.json(company);
});

