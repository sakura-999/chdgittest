// 用户所有的权限列表
export default [
  {
    name:'首页',
    icon:'home',
    path:'/admin/home',
    id:'0'
  },
  {
    name:'设置',
    icon:'setting',
    path:'/admin/setting',
    id:'1'
  },
  {
    name:'商品管理',
    icon:"",
    path:'',
    id:'2',
    children:[
      {
        name:'商品列表',
        path:'/admin/goods/list',
        id:'2-0'
      },
      {
        name:'商品添加',
        path:'/admin/goods/add',
        id:'2-1'
      }
    ]
  }
]