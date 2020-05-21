// pages/class/login/login.js
var appInst = getApp();
const cgi = require('../../../constant/cgi.js');
Page({
  data: {
    openid:'',
    formData: {
      password: '',
      name: '',
    },
    rules: {
      name: [
        { type: 'required', message: '账号不能为空' }
      ],
      password: [
        { type: 'required', message: '密码不能为空' }
      ]
    },
    texts: "学校教师登录"
  },

  // 输入
  handleChange(e) {
    this.setData({
      [`formData.${e.target.id}`]: e.detail.value.replace(/\s/g, '')
    })
  },

  // 登录
  handleFormSubmit(e) {
    const { validStatus, value: { name, password } } = e.detail
    console.log(e.detail)

    if (validStatus) {
      wx.showLoading({
        title: '请稍等...',
      });
      let that = this;
      wx.request({
        method: 'POST',
        url: cgi.loginTask.loginUser,
        data: {
          account: that.data.formData.name,
          userPwd: that.data.formData.password
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res, "login")
          // 登录成功跳转完成学校首页
          if (res.data.code == 200 && res.data.data.status == 2) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })

            var token = res.data.data.token
            wx.setStorage({
              key: 'token',
              data: token
            });
            wx.setStorage({
              key: 'userInfo',
              data: res.data.data.userInfo
            });

            wx.hideLoading();
            if (res.data.data.infoCompleteStatus == 0) {
              //保存openid到用户表再跳转到班级首页
              var user = res.data.data.userInfo;
              user.openid = wx.getStorageSync("openid");
              wx.request({
                method: 'POST',
                url: cgi.myCenter.editUser,
                header: {
                  'token': wx.getStorageSync('token')
                },
                data: user,
                success(res) {
                  console.log(res, "122121");
                  //更新userInfo缓存 
                  wx.removeStorageSync("userInfo");
                  wx.setStorage({
                    key: 'userInfo',
                    data: user,
                    success(res) {
                      wx.reLaunch({
                        url: '/pages/class/index/index',
                      });
                    }
                  });
                }
              })
            } else {
              wx.reLaunch({
                url: '/pages/class/index/index',
              })
            }
          } else {
            wx.reLaunch({
              url: '/pages/class/teacher-register/status/status?status=' + res.data.data.status,
            });
          }

        }
      })

    }
  },
  onLoad: function (options) {
    console.log(options, "class login options")
    if (options){
      this.setData({
        openid:options.openid
      })
    }
    let that = this;
    let openid = this.data.openid;
    if (!openid){
      openid = wx.getStorageSync("openid");
      if (!openid) {
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
                if (!options || !options.src || options.src!='logout'){
                  that.openidlogin();
                }
              }
            })
          }
        })
      }else{
        that.setData({
          openid:openid
        })
        if (!options || !options.src || options.src!='logout'){
          that.openidlogin();
        }
      }
    }else{
      if (!options || !options.src || options.src != "logout") {
        that.openidlogin();
      }
    }
  },
  // 自动登录
  openidlogin() {
    console.log('openid')
    let that = this;
    var openid = ''
    wx.request({
      method: 'POST',
      url: cgi.loginTask.openidlogin,
      data: {
        openid: that.data.openid,
        type: wx.getStorageSync('thrRole')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res,'thr info')
        // 登录成功跳转完成学校首页
        if (res.data.code == 200 && res.data.data.status == 2) {

          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });

          var token = res.data.data.token
          wx.setStorage({
            key: 'token',
            data: token
          });
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data.userInfo
          });
          console.log('登录成功...');
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/class/index/index',
          })
        } else if (res.data.code == 200 && res.data.data.status!=2){
          console.log('/pages/class/teacher-register/status/status?status=' + res.data.data.status + '&orgid=' + res.data.data.userInfo.orgid + '&orgName=' + res.data.data.userInfo.orgName,'232')
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data.userInfo
          });
          wx.reLaunch({
            url: '/pages/class/teacher-register/status/status?status=' + 1 +'&orgid=' + res.data.data.userInfo.orgid + '&orgName=' + res.data.data.userInfo.orgName,
          })
        } else if (res.data.code == 666){
          var users = res.data.data.multiBindUserList;
          var i=0;
          for(;i<users.length;i++){
            if (users[i].type == 'DEY' || users[i].type == 'THR' || users[i].type == 'MAS'){
              wx.setStorage({
                key: 'thrRole',
                data: users[i].type,
              });
              that.openidlogin();
              return;
            }
          }
          if(i==users.length){
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '欢迎访问教委数据采集系统',
            icon: 'none'
          })
        }
      }
    })
  }

})
