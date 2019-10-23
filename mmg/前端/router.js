import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/weixin/Home.vue"
//import Login from "./components/xz/Login.vue"
//import Reg from "./components/xz/Reg.vue"
import Bottom from "./components/muying/Bottom.vue"
import Details from "./components/muying/Details.vue"
import Search from "./components/muying/Search.vue"
import Gwc from "./components/muying/Gwc.vue"
import Xiangqing from "./components/muying/Xiangqing.vue"
import login from "./components/muying/login.vue"
import reg from "./components/muying/reg.vue"
import Sy from "./components/muying/Sy.vue"
import Syjifen from "./components/muying/Syjifen.vue"
import Sy_youhui from "./components/muying/Sy_youhui.vue"
import Syquanbu from "./components/muying/Syquanbu.vue"
import Sy_yuer1 from "./components/muying/Sy_yuer1.vue"
import Sy_xiangqing from "./components/muying/Sy_xiangqing.vue"
import Sy_cuxiao from "./components/muying/Sy_cuxiao.vue"
import Sycuxiao_moren from "./components/muying/Sycuxiao_moren.vue"
import Sy_zhipin from "./components/muying/Sy_zhipin.vue"
import Sy_myyouhui from "./components/muying/Sy_myyouhui.vue"
import Sy_mszq from "./components/muying/Sy_mszq.vue"
//首页 一元抢购
import syone from"./components/muying/Sy_one.vue"
//新品推荐
import syxinpin from"./components/muying/Sy_xinpin.vue"
//拼团
import sypintuan from"./components/muying/Sy_pintuan.vue"
import sypintuanxq from"./components/muying/SypintuanXQ.vue"
//付款
import syfukuan from"./components/muying/Sy_fukuan.vue"
// 我的
import order from "./components/muying/Me_myorder.vue"
import personal from "./components/muying/Me_personal.vue"
import jf from "./components/muying/Me_jf_index.vue"
import yhq from "./components/muying/Me_yhq_index.vue"
import xttz from "./components/muying/Me_xttz_all.vue"
import shdz from "./components/muying/Me_shdz.vue"
import shdzadd from "./components/muying/Me_shdz_add.vue"
import me from "./components/muying/Me.vue"
Vue.use(Router)
export default new Router({
  routes: [
	  // 我的
	  {path:'/me',component:me},
    {path:'/shdzadd',component:shdzadd},
    {path:'/shdz',component:shdz},
    {path:'/xttz',component:xttz},
    {path:'/yhq',component:yhq},
    {path:'/jf',component:jf},
    {path:'/personal',component:personal},
    {path:'/order',component:order},
    
	  //付款
    {path:'/syfukuan',component:syfukuan},
    //拼团详情
    {path:'/sypintuanxq/:lid',component:sypintuanxq,props:true},
    //拼团
    {path:'/sypintuan',component:sypintuan},
    //新品推荐
    {path:'/syxinpin',component:syxinpin},
    // 一元抢购
    {path:'/syone',component:syone},
    {path:'/Sy_mszq',component:Sy_mszq},
    {path:'/Sy_myyouhui',component:Sy_myyouhui},
    {path:'/Sy_youhui',component:Sy_youhui},
    {path:'/Sy_zhipin',component:Sy_zhipin},
    {path:'/Sycuxiao_moren',component:Sycuxiao_moren},
    {path:'/Sy_cuxiao',component:Sy_cuxiao},
    {path:'/Sy_yuer1/:mid',component:Sy_yuer1,props:true},
    {path:'/Syquanbu',component:Syquanbu},
    {path:'/Syjifen',component:Syjifen},
    {path:'/Sy',component:Sy},
    {path:'/Sy_xiangqing/:lid',component:Sy_xiangqing,props:true},
    {path:'/reg',component:reg},
    {path:'/login',component:login},
    {path:'/Xiangqing/:mid',component:Xiangqing,props:true},
    {path:'/Gwc',component:Gwc},
    {path:'/Search',component:Search},
    {path:'/Details/:lid',component:Details,props:true},
    {path:'/Bottom',component:Bottom},
    //{path:'/Reg',component:Reg},
    //{path:'/Login',component:Login},
    {path:'/Home',component:Home},
    {path:'/',component:HelloContainer},
  ]
})
