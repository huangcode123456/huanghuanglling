<template>
    <div class="t1">
        <div class="title">
            <h4>0到一岁的娃最爱什么玩具?</h4>
            <div class="time">2017-9-21</div>
            <div class="zuozhe">发布:年糕妈妈</div>
        </div>
        <div class="content">
            <div class="text">
                &nbsp;&nbsp;&nbsp;&nbsp;{{a.content}}
                <img :src="'http://127.0.0.1:4000/'+a.pic2" alt="">
            </div>
        </div>
        <!-- 分享按钮 -->
        <div class="content">
            <div class="butn">分享</div>
        </div>
        <div class="content">
            <div class="comments">
                <mt-field placeholder="我也来说几句..."></mt-field>
                <div class="fabu">
                    <button class="fabu-btn">发布</button>
                </div>
                <p>
                    
                最近评论{{a.comment}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      active:"tab",
      a:{pic1:"jx_hl1.jpg",pic2:"jx_hl1.jpg",pic3:"jx_hl1.jpg"}
    }
  },
props:["mid"],
  created(){
    this.change();
  },
  methods:{
       change(){

          var url="xiang";
			this.axios.get(url,{params:{mid:this.mid}})
		.then(res=>{
        	console.log(res);
                  this.a=res.data.data[0];
                  console.log(this.a);
 			})
       }
  }
}
</script>
<style scoped>
/*标题和内容*/
    .t1{
        width:80%;
        margin:0 auto;
    }
    .title{
        width:100%;
        margin:0 auto;
        position: relative;
    }
    .title h4{
        margin:0 auto;
        text-align: center;
        color:#666;
        }
    .time{
        width:30%;
        height:35%;
        font-size: 0.2em;
        color:#888;
        position: absolute;
        margin-left:0px;
        margin-top:0px;
        opacity: 1;
        text-align: left;
        left:10px;
        top:34px;
        margin-right:0px;
    }
    .zuozhe{
        width:30%;
        height:35%;
        font-size:0.2em;
        color:#888;
        position: absolute;
        margin-left:0px;
        margin-top:0px;
        opacity: 1;
        text-align: left;
        left:210px;
        top:34px;
        margin-right:0px;
    }
    .content{
        position: relative;
        width:100%;
        max-width: 100%;
        clear: both;
    }
    .text{
        width:94%;
        font-size: 0.9em;
        color:#888;
        line-height:22px;
        margin-left:auto;
        margin-top:10px;
        opacity: 1;
        text-align: left;
        margin-right:auto;
    }
    .text img{
        max-width: 100%;
        vertical-align: top;
    }
/*分享按钮*/
    .content{
        position: relative;
        width:100%;
        max-width: 100%;
        clear: both;
    }
    .butn{
        width:74px;
        height: 30px;
        background-color: rgb(255,189,197);
        color:#fff;
        font-size: 14px;
        border-style: none;
        line-height: 30px;
        margin:0 auto;
        margin-top:0px;
        opacity: 1;
        text-align: center
    }
/*评论*/
    .comments{
        position: relative;
        margin-top: 6px;
        background-color: rgb(255,255,255);
    }
    .fabu{
        display: inline-block;
        width:28%;
        height:30px;
        vertical-align: bottom;
        font-size:0.9em;
        margin-top:0;
    }
/*按钮*/
.fabu-btn{
    width:100%;
    margin:0;
    height:28px;
    background-color: transparent;
    border-radius: 3px;
    border:1px solid #d6d6d8;
    color:#666;
    outline-color: #fff;
}
.comments p{
    line-height: 35px;
    font-size: 1.1em;
    color:#2b2b2b;
    border-left:5px solid rgb(255,210,215);
    border-bottom:1px dashed #e3e3e3;
}
</style>

