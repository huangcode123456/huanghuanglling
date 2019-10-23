<template>
    <div class="app">
        <div class="list">
            <div class="goods" v-for="(list,i) of list" :key="i">
                <router-link :to="'/sypintuanxq/'+list.lid">
                    <img class="goods-img" :src="'http://127.0.0.1:4000/'+list.pic" alt="">
                    <div class="info">
                        <div class="biaoti">{{list.title}}</div>
                        <div class="group-price">
                            拼团价:¥140.00~¥140.00
                            <div class="tag"> 减价</div>
                        </div>
                        <div class="single-price">单买价:¥{{list.price}}.00</div>
                        <div class="grouping">暂无进行中的团</div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="normore">没有更多了~</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{price:0,pic:"pig.png"}],
        }
    },
    created() {
       this.change();  
   },
    methods: {
       change(){
           this.axios.get("product").then(res=>{
               console.log(res);
               this.list=res.data.data.slice(35,37);
               console.log(this.list)
           })
       },
   }
}
</script>
<style scoped>
    .app{width:86%;height:1027px;margin:0 auto;background-color:#ccc;}
    .list{width:100%;height:190px;}
    .goods{
        width:94%;
        height:70px;
        background: #fff;
        margin-bottom: 5px;
        overflow: hidden;
        padding: 10px;
    }
    .goods-img{
        height:70px;
        width:70px;
        border:0;
    }
    .info{
        display: inline-block;
        font-size: 13px;
        vertical-align: top;
        padding-left:5px;
        width:210px;
    }
    .biaoti{height:16px;line-height: 16px;font-size: 13px;}
    .group-price{
        height: 20px;
        line-height: 20px;
        color:#ff0e1b;
        font-size:12px;
    }
    .tag{
        display: inline-block;
        position: relative;
        padding:0 7px;
        height:12px;
        line-height: 12px;
        color:#fff;
        text-align: center;
        font-size: 8px;
        vertical-align: middle;
        margin-top:-7px;
        margin-left:5px;
        background-image: -webkit-gradient(linear,0 0,right 0,from(#ff00ea),to(#ff0e18));
    }
    .tag::before{
        content:'';
        position: absolute;
        left:0;
        top:0;
        border-top:6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left:3px solid #fff;
    }
    .tag::after{
        content:'';
        position: absolute;
        right:0;
        top:0;
        border-top:6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right:3px solid #fff;
    }
    .grouping{
        color:#999;
        height:20px;
        line-height: 20px;
        font-size: 12px;
    }
    .normore{
        height:50px;
        color:#999;
        text-align: center;
        line-height: 50px;
    }
</style>
