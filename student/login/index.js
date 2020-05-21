// pages/student/login/index.js
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
    texts: "学生家长登录"
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
    let that = this;
    if (validStatus) {
      wx.showLoading({
        title: '请稍等...',
      })
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
          // 登录成功跳转完成首页
          if (res.data.code == 200){
            if(res.data.data.status == 2) {
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
              wx.reLaunch({
                url: '/pages/student/index/index',
              })
            }else{
              wx.reLaunch({
                url: '/pages/student/student-register/status/status?status=' + res.data.data.status,
              });
            }
          } else {
            wx.showToast({
              title: '登录失败，请重新登录',
              icon: 'none'
            });
          }

        }
      })
    }
  },
  onLoad: function (options) {
    console.log(options,"student login options")
    if (options) {
      this.setData({
        openid: options.openid
      })
    }
    let that = this;
    let openid = this.data.openid;
    if (!openid) {
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
                if (!options || !options.src || options.src != 'logout') {
                  that.openidlogin();
                }
              }
            })
          }
        })
      } else {
        that.setData({
          openid: openid
        })
        if (!options || !options.src || options.src != 'logout') {
          that.openidlogin();
        }
      }
    } else {
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
        type:wx.getStorageSync('clsRole')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res)
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
            url: '/pages/student/index/index',
          })
        } else if (res.data.code == 200 && res.data.data.status != 2) {
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data.userInfo
          });
          let user = res.data.data.userInfo;
          wx.reLaunch({
            url: '/pages/student/student-register/status/status?status=' + res.data.data.status + '&orgid=' + user.orgid + '&openid=' + user.openid + '&classId=' + user.classId + '&gradeId=' + user.gradeId + '&userName=' + user.userName + '&className=' + user.className + '&gradeName=' + user.gradeName + '&orgName=' + user.orgName,
          })
        } else if (res.data.code == 666) {
          var users = res.data.data.multiBindUserList;
          var i = 0;
          for (; i < users.length; i++) {
            if (users[i].type == 'CLS' || users[i].type == 'RPT') {
              wx.setStorage({
                key: 'clsRole',
                data: users[i].type,
              });
              that.openidlogin();
              return;
            }
          }
          if (i == users.length) {
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