const express = require('express')
const path = require('path')
const db = require('./db/connect');
const Jwt  = require('./utils/jwt');
const User = require('./db/model/userModel');
// 启动服务器的同时连接数据库
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// 静态资源目录
app.use('/',express.static(path.join(__dirname,'./www')))
// 路由分发

const UserRouter = require('./router/userRouter')
const FoodRouter = require('./router/foodRouter')
app.use('/admin/user',UserRouter)
app.use('/admin/food',(req,res,next)=>{
  // 看用户有咩有传 token
  let token = req.query.token;
  // 验证token是不是真的;
  if(!token){return res.send({err:-998,msg:'token 缺失'})}
  let data = Jwt.verifyToken(token);
  if(data){
    // data 为真 表示合法;
    console.log(data);
    let _id = data._id;
    User.find({_id,token})
    .then(()=>{
      
    })
    .catch(()=>{
      
    })
    next()
  }else{
    res.send({err:-999,msg:'token 非法'})
  }
},FoodRouter)

app.listen(7777,()=>{
  console.log('服务器启动')
})