
// pages/index/index.js
const cgi = require('../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSCH:false,
    isTHR: false,
    isCLS: false,
    openid:'',
    needLogin: true, //自动登录失败时为true,用户界面手动选择登录
  },

  initLogin:function(options){
    let that = this;
    wx.login({
      success(res) {
        const code = res.code;
        wx.request({
          url: cgi.loginTask.code2openid,
          data: { "code": code },
          success(res) {
            wx.setStorage({
              key: 'openid',
              data: res.data.data.openid
            });
            that.setData({
              openid: res.data.data.openid
            });
            if (!options || !options.src || options.src != "logout") {
              that.openidlogin();
            }
          }
        })
      }
    })
  },
  // 自动登录
  openidlogin() {
    let that = this;
    wx.request({
      method: 'POST',
      url: cgi.loginTask.openidlogin,
      data: {
        openid: that.data.openid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res,"login")
        // 登录成功跳转完成学校首页
        if (res.data.code == 200 && res.data.data.status == 2) {

          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });

          var token = res.data.data.token;
          var userInfo = res.data.data.userInfo;
          wx.setStorage({
            key: 'token',
            data: token
          });
          wx.setStorage({
            key: 'userInfo',
            data: userInfo
          });
          console.log('登录成功...');
          wx.hideLoading();
          //根据当前登录用户类型还决定跳转的首页ORG科室管理员，SCHM学校主管理员，SCH学校管理员(副)，MAS班主任，DEY副班主任，THR普通教师，CLS学生（第一填报人），RPT共同填报人
          if (userInfo.type == "SCHM" || userInfo.type == "SCH"){
            if (res.data.data.infoCompleteStatus == 1) {
              wx.reLaunch({
                url: '/pages/school/index/index',
              });
            } else {
              var url = "/pages/school/myCenter/profileEdit/profileEdit"
              var orgid = userInfo.orgid;
              if (res.data.data.infoCompleteStatus == 0) {
                var firstLogin = 1
                wx.reLaunch({
                  url: '/pages/school/myCenter/profileEdit/profileEdit?firstLogin=' + firstLogin
                })
              } else {
                wx.reLaunch({
                  url: url + '?orgid=' + orgid,
                })
              }
            }
          } else if (userInfo.type == "MAS" || userInfo.type == "DEY" || userInfo.type=="THR"){
            wx.reLaunch({
              url: '/pages/class/index/index',
            });
          } else if (userInfo.type == "CLS" || userInfo.type=="RPT"){
            wx.reLaunch({
              url: '/pages/student/index/index',
            });
          }
        } else if (res.data.code == 200){
          var userInfo = res.data.data.userInfo;
          wx.setStorage({
            key: 'userInfo',
            data: userInfo
          });
          if (userInfo.type == "SCH" || userInfo.type == "SCHM"){
            wx.reLaunch({
              url: '/pages/school/admin-register/status/status?status=' + res.data.data.status,
            });
          } else if(userInfo.type == "MAS" || userInfo.type == "DEY" || userInfo.type == "THR"){
            wx.reLaunch({
              url: '/pages/class/teacher-register/status/status?status=' + res.data.data.status,
            });
          } else if (userInfo.type == "CLS" || userInfo.type == "RPT") {
            wx.reLaunch({
              url: '/pages/class/student-register/status/status?status=' + res.data.data.status,
            });
          }

        }else if(res.data.code==666){
          let users = res.data.data.multiBindUserList;
          let isSCH = false;
          let isTHR = false;
          let isCLS = false;
          for(var i=0;i<users.length;i++){
            if (users[i].type == 'SCH' || users[i].type == 'SCHM'){
              isSCH = true;
              wx.setStorage({
                key: 'schRole',
                data: users[i].type,
              });
            } else if (users[i].type == "MAS"|| users[i].type == "DEY" || users[i].type == "THR") {
              isTHR = true;
              wx.setStorage({
                key: 'thrRole',
                data: users[i].type,
              });
            } else if (users[i].type == "CLS" || users[i].type == "RPT") {
              isCLS = true;
              wx.setStorage({
                key: 'clsRole',
                data: users[i].type,
              });
            }
          }
          that.setData({
            isSCH: isSCH,
            isTHR: isTHR,
            isCLS: isCLS
          })
        }else{
          that.setData({
            isSCH: true,
            isTHR: false,
            isCLS: false
          })
          wx.showToast({
            title: '欢迎访问教委数据采集系统',
            icon: 'none'
          });

        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorage();
    this.initLogin(options)
  },

  // 跳转学校管理员登录
  goToAdminLogin() {
    wx.navigateTo({
      url: '/pages/school/admin-login/index',
    })
  },

  // 跳转学校老师登录
  goToTeacherLogin() {
    wx.navigateTo({
      url: '/pages/class/login/login',
    })
  },

  // 跳转学生（家长）登录
  goToStudentLogin() {
    wx.navigateTo({
      url: '/pages/student/login/index',
    })
  },

  // 暂未开放
  goToComingsoon(){
    wx.navigateTo({
      url: '/pages/public/comingsoon/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})