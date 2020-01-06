const express = require('express')
const router = express.Router()
const Food = require('../control/foodController')

/**
 * @api {get} /admin/food/getFoods 查询
 * @apiName getFoods
 * @apiGroup Food
 *
 * @apiParam {Number} us page
 * @apiParam {Number} ps pageSize.
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
//查询接口（分页查询  分类查询 关键字查询）
router.get('/getFoods',(req,res)=>{
  let page=Number(req.query.page)||1
  let pageSize=Number(req.query.pageSize)||2
  Food.get(page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询失败'})})
})
// 分类查询
/**
 * @api {get} /admin/food/getFoodsByType 分类查询
 * @apiName getFoodsByType
 * @apiGroup Food
 *
 * @apiParam {Number}  page  页
 * @apiParam {Number}  pageSize 页数. 
 * @apiParam {String}  foodType 食物类型. 
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
router.get('/getFoodsByType',(req,res)=>{
  let {foodType} = req.query 
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  Food.getByType(foodType,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
})

/**
 * @api {get} /admin/food/getFoodsByKw 关键字查询
 * @apiName getFoodsByKw
 * @apiGroup Food
 *
 * @apiParam {Number}  page  页
 * @apiParam {Number}  pageSize 页数. 
 * @apiParam {String}  kw 关键字.
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
// 关键字查询
router.get('/getFoodsByKw',(req,res)=>{
  let page=Number(req.query.page)||1
  let pageSize = Number(req.query.pageSize)||2
  let kw = req.query.kw 
  Food.getByKw(kw,page,pageSize)
  .then((data)=>{
    res.send({err:0,msg:'ok',list:data})
  })
})

/**
 * @api {get} /admin/food/delFood 删除
 * @apiName delFood
 * @apiGroup Food
 *
 * @apiParam {String}  foodId 食物id. 
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
//删除接口
router.get('/delFood',(req,res)=>{
  let  {foodId}=req.query
  Food.del(foodId)
  .then((data)=>{
    res.send({err:0,msg:'del ok'})
  })
  .catch((err)=>{ 
    res.send({err:-1,msg:'del nook'})
  })
})

/**
 * @api {post} /admin/food/addFood 添加食品
 * @apiName addFood
 * @apiGroup Food
 *
 * @apiParam {String}  name 食物名称. 
 * @apiParam {Number}  price 食物价格. 
 * @apiParam {String}  foodType 食物类型. 
 * @apiParam {String}  desc 食物描述. 
 * @apiParam {String}  img 食物图片. 
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
//添加数据
router.post('/addFood',(req,res)=>{
  let {name,price,img,foodType,desc} = req.body 
  Food.add(name,price,img,foodType,desc)
  .then((data)=>{res.send({err:0,msg:'添加ok'})})
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'添加失败'})})
})
//修改 
/**
 * @api {get} /admin/food/updateFood 修改
 * @apiName updateFood
 * @apiGroup Food
 *
 * @apiParam {String}  name 食物名称. 
 * @apiParam {Number}  price 食物价格. 
 * @apiParam {String}  foodType 食物类型. 
 * @apiParam {String}  desc 食物描述. 
 * @apiParam {String}  foodId 食物id. 
 * @apiParam {String}  img 食物图片. 
 *
 * @apiSuccess {String} err Firstname of the Food.
 * @apiSuccess {String} msg  Lastname of the Food.
 */
router.get('/updateFood',(req,res)=>{
  let {foodId,name,price,img,foodType,desc} = req.query 
  Food.update(foodId,name,price,img,foodType,desc)
  .then((data)=>{res.send({err:0,msg:'修改ok'})})
  .catch((data)=>{res.send({err:-1,msg:'修改失败'})})
})
module.exports = router