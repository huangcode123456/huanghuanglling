<template>
    <div class="Box1">
        <div class="box">
            <router-link :to="'/Details/'+list.lid" class="p1">
                <img :src="'http://127.0.0.1:4000/'+list.pic" width="100%" height="160px">
                <p class="titl">{{list.titel}}</p>
                <div>
                    <span class="jiage">¥{{list.price.toFixed(2)}}</span>
                    <span class="yuanjia">¥279.00</span>
                </div>
                <div class="wrap">
                    <span style="font-size:10px;color:#999">已售0.8%</span>
                    <div class="tiao"></div>
                </div>
                <div class="countdown">
                    <label for="">距结束</label>
                    <span>{{countDownList}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:{price:0,pic:"t_4.jpg"},
            countDownList: '00天00时00分00秒',
　　　　　　 actEndTime: '2019-11-19 18:50:00'//结束时间
        };
    },
    created() {
       this.change();
       this.countDown();  
   },
    methods: {
       change(){
           this.axios.get("product").then(res=>{
               console.log(res);
               this.list=res.data.data[25];
               //console.log(this.list)
           })
       },
       timeFormat(param) {
　　　　　　return param < 10 ? '0' + param : param;
　　　　},
　　　　countDown(it) {
　　　　　　var interval = setInterval(() => {
　　　　　　　　// 获取当前时间，同时得到活动结束时间数组
　　　　　　　　let newTime = new Date().getTime();
　　　　　　　　// 对结束时间进行处理渲染到页面
　　　　　　　　let endTime = new Date(this.actEndTime).getTime();
　　　　　　　　let obj = null;
　　　　　　　　// 如果活动未结束，对时间进行处理
　　　　　　　　if (endTime - newTime > 0) {
　　　　　　　　　　let time = (endTime - newTime) / 1000;
　　　　　　　　　　// 获取天、时、分、秒
　　　　　　　　　　let day = parseInt(time / (60 * 60 * 24));
　　　　　　　　　　let hou = parseInt(time % (60 * 60 * 24) / 3600);
　　　　　　　　　　let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
　　　　　　　　　　let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
　　　　　　　　　　obj = {
　　　　　　　　　　　　day: this.timeFormat(day),
　　　　　　　　　　　　hou: this.timeFormat(hou),
　　　　　　　　　　　　min: this.timeFormat(min),
　　　　　　　　　　　　sec: this.timeFormat(sec)
　　　　　　　　　　};
　　　　　　　　} else { // 活动已结束，全部设置为'00'
　　　　　　　　　　obj = {
　　　　　　　　　　　　day: '00',
　　　　　　　　　　　　hou: '00',
　　　　　　　　　　　　min: '00',
　　　　　　　　　　　　sec: '00'
　　　　　　　　　　};
　　　　　　　　　　clearInterval(interval);
　　　　　　　　}
　　　　　　　　this.countDownList =obj.day + '天' + obj.hou + ':' + obj.min + ':' + obj.sec;
　　　　　　}, 1000);
　　　　}
　　}
}

</script>
<style scoped>
.app{width:86%;margin:0 auto;}
.box{
 
    width:86%;
    height:275px;
    margin:0 auto;
    clear: both;
    background: #f3f3f3;
    }
    .p1{
        display: inline-block;
        vertical-align: middle;
        height:auto;
        position: relative;
        width:50%;
        height:260px;
        text-decoration: inherit;
        border-radius: inherit;
        z-index:1;
        background: #fff;
    }
    .titl{
        width:100%;
        color:#999;
        font-size:15px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom:11px;
    }
    .jiage{
        font-size:16px;
        color:#f60;
        margin-right: 10px;
    }
    .yuanjia{
        font-size: 10px;
        color:#888;
        text-decoration: line-through;
    }
    .wrap{margin-top:5px;}
    .tiao{
        width:78px;
        margin-left: 17px;
        display: inline-block;
        height:6px;
        border-radius: 5px;
        border:2px solid #f31e4a;
        overflow: hidden;
    }
    .countdown{
        background-color:#f31e4a;
        color:#fff;
        font-size: 12px;
        padding:0 3px;
        height:24px;
        line-height: 20px;
        margin-top:5px;
    }
    .countdown label{
        vertical-align: middle;
    }
    .countdown span{
        height:14px;
        background-color:#9b0020;
        display:inline-block;
        color:#fff;
        text-align: center;
        line-height: 17px;
        margin:4px 17px;
        padding: 0 3px;
        border-radius: 4px;
        vertical-align: top;

    }
</style>

