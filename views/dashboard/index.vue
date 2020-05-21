<template>
  <div class="jm-wrapper">
    <!-- 头部 -->
    <div class="jm-header">
      <div class="head-left">
        <img class="logo" src="../../assets/images/logo.jpeg" alt="">
        <div class="text">
          <h4>美丽人才岛<span>运行监控管理平台</span></h4>
          <p class="mt5">{{nowDate}} {{nowWeek}} {{nowTime}}</p>
        </div>
      </div>
      <div class="head-right">
          <ul class="menu">
            <li><router-link to="/entirety">综合监测</router-link></li>
            <li><router-link to="/traffic">交通监测</router-link></li>
            <li><router-link to="/community">社区监测</router-link></li>
            <li><router-link to="/citySecurity">城市安防</router-link></li>
            <li><router-link to="/municipal">市政监测</router-link></li>
            <li><router-link to="/environment">环境监测</router-link></li>
            <li><router-link to="/culturalTourism">文旅决策</router-link></li>
						<li><router-link to="/configure">配置管理</router-link></li>
						<li><router-link to="/system">系统管理</router-link></li>
          </ul>
          <div class="account">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img class="avatar" src="https://randomuser.me/api/portraits/men/10.jpg" alt="">
                <span>总管理员</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="account-dropdown-items">
                <el-dropdown-item >修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
    </div>
    

    <!-- 主体 -->
    <div class="jm-container">
      <router-view/>
    </div>

    <!-- 底部 -->
    <div class="jm-footer">
      江门人才岛运行监控管理平台 Copyright 2020 All Rights Reserved.
    </div>
    

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      nowDate: "",    // 当前日期
      nowTime: "",    // 当前时间
      nowWeek: ""     // 当前星期
    };
  },
  methods: {
    // 获取当前日期时间星期
    currentTime() {
        setInterval(this.getDate, 500);
    },
    getDate: function() {
        var that = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let week = new Date().getDay();
        let hh = new Date().getHours();
        let ff = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
        if (week == 1) {
            that.nowWeek = "星期一";
        } else if (week == 2) {
            that.nowWeek = "星期二";
        } else if (week == 3) {
            that.nowWeek = "星期三";
        } else if (week == 4) {
            that.nowWeek = "星期四";
        } else if (week == 5) {
            that.nowWeek = "星期五";
        } else if (week == 6) {
            that.nowWeek = "星期六";
        } else {
            that.nowWeek = "星期日";
        }
        that.nowTime = hh + ":" + ff + ":" + ss;
        that.nowDate = yy + "年" + mm + "月" + dd + "日";
    },
    
    // 退出
    async signOut() {
      const res = await this.http.post(this.api.admin.logout);
      console.log(res);
      if (res.data.code === 200) {
        setTimeout(() => {
          this.$router.push({path: '/'});
          sessionStorage.removeItem('token');
        }, 500)
      } else {
        this.$message.error(res.data.message);
      }
    },
  },
  created() {
    // this.$store.commit("editTitle", "首页");
  },
  mounted() {
      this.currentTime();
  },
  // 销毁定时器
  beforeDestroy: function() {
      if (this.getDate) {
          clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
      }
  },
  components: {}
};
</script>
<style scoped lang="less">
  .jm-wrapper{
    display: flex;
    flex-direction: column; 
    height: 100vh; 
    background: url(../../assets/images/bg-page.jpg);
    background-size: cover;

  }
  .jm-header{
    flex-grow: 0;
    flex-shrink: 0;
    height: 60px;
    padding:5px 10px;
    overflow: hidden;
    position: relative;
    background: rgba(0,52,134,.6);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .head-left{
      flex: 1;
      display: flex;
      align-items: center;
      line-height: 1;

      .logo{
        height:50px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .text{
        h4{
          font-weight: 600;
          font-size: 16px;
          span{
            margin-left: 5px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(255, 2555, 255, .6)
          }
        }
        p{
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    .head-right{
      display: flex;
      .menu{
        display: flex;
        font-size: 20px;
        li{
          margin-right: 5px;
          a{
            color:rgba(255, 2555, 255, .95);
            line-height: 36px;
            height: 34px;
            border: solid 1px transparent;
            font-size: 14px;
            display: block;
            text-decoration: none;
            padding: 0 30px;
            border-radius: 7px;
            &:hover{
              color:rgba(255, 2555, 255, 1);
            }
            
            &.router-link-active{
              font-weight: 800;
              color:rgba(255, 2555, 255, 1);
              border: solid 1px rgba(255, 2555, 255, .6);
              box-shadow: inset 0 0 5px 0  rgba(255, 2555, 255, .4);
              // background: linear-gradient(118deg,rgba(5,39,109,1),rgba(11,77,173,.7));
              // box-shadow:rgba(11,77,173, 0.7) 0px 0px 50px 1px;
            }
          }
        }
      }
      .account{
        line-height: 32px;
        .el-dropdown-link {
          font-size: 12px;
          cursor:pointer;
          color: rgba(255, 2555, 255, .8);
          .avatar{
            width: 32px;
            height: 32px;
            border-radius: 100%;
            margin-right: 5px;
          }
        }
        
      }
      
    }
  }
  .account-dropdown-items /deep/ .el-dropdown-menu__item{
    font-size: 12px ;
  }
 
  .jm-container{
    flex-grow:1;
    overflow-y: auto;
    z-index: 2;
    position: relative;

  }
  .jm-footer{
    flex-grow: 0;
    flex-shrink: 0;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color:#c2c6dc;
    text-align: center;
    background-color:rgba(0,52,134,.8);
    box-shadow: 0 -2px 10px rgba(0,0,0,.05);
    z-index: 10;
  }
</style>

