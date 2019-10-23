<template>
  <div class="app">
    <!--1:开关组件-->
    <!-- <mt-switch v-model="val1" @change="handle2"></mt-switch> -->
    <!-- 头部 -->
        <div class="mami-top">
            <div class="tu">
                <img src="../../img/sd.png" alt="" width=100% height="100%">
            </div>
            <span>妈咪购(公众号母婴小程序)</span>
        </div>
    <!-- 消费金额 -->
        <div class="xf">
            消费金额
            <span class="pull-right">
                ¥<input type="number">
            </span>
        </div>
        <!-- 优惠信息 -->
        <div class="c1">
            优惠信息
            <div class="w1">
                <p style="color:red">-¥</p>
                <p>无</p>
            </div>
        </div>
        <!-- 储值抵扣 -->
            <div class="c1">
                <div>
                    储值抵扣
                    <div class="open">
                        <mt-switch v-model="val1" @change="handle2"></mt-switch>
                    </div>
                </div>
            </div>
        <!-- 留言 -->
            <div class="ly">
                <textarea placeholder="给对方留言"></textarea>
            </div>
                <mt-button type="danger" size="large" @click="open">支付</mt-button>
  </div>
</template>
<script>
//vue 导出export 默认对象 default
export default {
   data(){         //数据
     return {      //返回数据
       val1:true,  //默认打开状态
     }
   },
   methods:{      //方法,函数
    handle2(){
      //功能:当开关组件值发生修改后触发函数调用
      console.log(this.val1);
      },
    open(){
        this.$messagebox.confirm("是否确认支付")
     .then(action=>{//用户选择确认
       console.log("确认")
     })
     .catch(err=>{//用户选择取消
       console.log("取消")
     })
    },
        
    }
   }

</script>
<style scoped>
.app{height:1027px;background-color:#ebebeb}
/*头部*/
    .mami-top{padding: 15px;text-align: center;background-color: #f1f1f1;}
    .tu{
    display: inline-block;
    margin-right: 12px;
    width: 34px;
    height: 34px;
    line-height: 37px;
    border-radius: 50%;
    font-size: 24px;
    vertical-align: middle;
    color: #fff;
    background-color: #09ba07;
    }
/*消费金额*/
    .xf{
        height:26px;
        padding: 16px;
        padding-top: 18px;
        padding-bottom: 18px;
        font-size: 18px;
        line-height: 1.4;
        background-color: #fff;
        color: #666;
        border-bottom: 1px solid #eee;
    }
    .xf span{float: right;}
    .xf span input{
        display: inline-block;
        width: 60px;
        font-size: 20px;
        vertical-align: middle;
        border: none;
        outline: none;
        text-align: right;
    }
/*优惠信息*/
    .c1{
        height:36px;
        padding: 16px;
        line-height: 25px;
        border-bottom: 1px solid #eee;
        color: #b2b2b2;
        background-color: #fff;
    }
    .w1{
        float: right;  
    }
/*储值抵扣*/
  .open{
      float: right;
  }
/*留言*/
    .ly{
        padding: 16px;
        height: 50px;
        padding-top: 8px;
        padding-bottom: 8px;
        line-height: 1.4;
        background-color: #fff;
        border-bottom: 1px solid #eee;
    }
    .ly textarea{
         width: 100%;
        height: 46px;
        border: none;
        resize: none;
        outline: none;
    }
</style>


