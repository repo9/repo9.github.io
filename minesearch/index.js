var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/';

router.use(function (req,res,next) {
//   console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "Minesweeper.html");
});

app.use("/",router);

app.use('/js', express.static(path + 'js'));
app.use('/img', express.static(path + 'img'));
app.use('/style', express.static(path + 'style'));

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});