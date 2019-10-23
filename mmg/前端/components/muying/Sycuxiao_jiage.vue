<template>
    <div>
        <div class="product">
            <router-link :to="'/Details/'+list.lid" class="liebiao"  v-for="(list,i) of list" :key="i">
                <img :src="'http://127.0.0.1:4000/'+list.pic" alt="">
                <!-- 商品名称 -->
                 <p class="p1">{{list.title}}</p>
                 <!-- 商品价格 -->
                 <p>
                    <span class="s1">¥{{list.price.toFixed(2)}}</span>
                    <span class="s2">销量:{{list.sales}}</span>
                 </p>
            </router-link>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
         list:[{price:0,pic:"y_1.jpg"}]
        }
    },
    created() {
       this.change();
   },
   methods: {
       change(){
           this.axios.get("bottom").then(res=>{
               //console.log(res);
                var a=res.data.data[8];
                var b=res.data.data[13];
                var c=res.data.data[24];
                var d=res.data.data[18];
              //console.log(this.a)
              this.list=[a,b,c,d]
              //console.log(this.list)
              //console.log(this.list[0].price)
              
           })
       }
   },
}
</script>
<style scoped>
 /* 最外层元素 */
.product{
    width:86%;
    height:420px;
    margin: 0 auto;
    display: flex;
    /* 子元素两端对齐 */
    justify-content:center;
    flex-wrap: wrap;/*换行*/
    padding:4px;
    }
.liebiao{
    width:50%;
    height:215px;
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
}
.liebiao img{
    width:100%;
}
.p1{

    color: #333;
    font-size: 0.9em; 
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.s1{
    color:#f60;
    font-size: 1em;
    margin-right: 10px;
}
.s2{
    color:#888;
    font: size 0.8em;;
    margin-left: 7px;
}
a{text-decoration: none;}
</style>