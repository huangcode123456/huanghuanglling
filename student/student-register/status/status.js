// pages/student/student-register/status/status.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    openid: '',
    orgName: '',
    userName: '',
    gradeName: '',
    gradeId: '',
    className: '',
    classId: '',
    orgid: '',
    status: 0 // 状态 -1停用，0审核不通过，1待审核，2审核通过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.status) {
      this.setData({
        status: options.status
      });
    }
    console.log(options)
    let that = this;

    that.setData({
      orgName: options.orgName,
      openid: options.openid,
      token: options.token,
      classId: options.classId,
      gradeId: options.gradeId,
      orgid: options.orgid,
      userName: options.userName,
      className: options.className,
      gradeName: options.gradeName
    })
    let openid = wx.getStorageSync("openid");
    console.log("缓存 中的openID" + openid)
    if (!openid) {
      console.log("缓存 中没有openID")
      wx.login({
        success(res) {
          const code = res.code;
          console.log(code, "code");
          wx.request({
            url: cgi.loginTask.code2openid,
            data: { "code": code },
            success(resp) {
              console.log(resp, "openid");
              wx.setStorage({
                key: 'openid',
                data: resp.data.data.openid
              });
              that.setData({
                openid: resp.data.data.openid
              });

              that.refresh();
            }
          });
        }
      });
    } else {
      console.log("缓存 中有openID")
      that.setData({
        openid: openid
      });
      that.refresh();
    }
  },

  // 模拟刷新状态 -通过
  refresh() {
    console.log('刷新审核状态...')
    let that = this;
    console.log(that.data.userInfo, "userinfo");
    console.log(that.data.openid, "openid");
    wx.request({
      method: 'POST',
      url: cgi.loginTask.openidlogin,
      data: {
        openid: that.data.openid,
        type: wx.getStorageSync('clsRole')
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res, "ss");
        that.setData({
          status: res.data.data.status,
          userInfo: res.data.data.userInfo
        });
        wx.removeStorage({
          key: 'userInfo',
          success: function (resp) {
            wx.setStorage({
              key: 'userInfo',
              data: res.data.data.userInfo
            })
          },
        })
      }
    });
  },

  // 审核通过跳转登录
  goToLogin() {
    let that = this;
    wx.reLaunch({
      url: '/pages/student/login/index?openid=' + that.data.openid,
    })
  },

  // 审核未通过，重新填写注册
  goToRegister() {
    let that = this;
    wx.request({
      method: 'POST',
      url: cgi.loginTask.delNopassUser,
      data: {
        userId: that.data.userInfo.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.removeStorageSync("userInfo");
          console.log('/pages/student/student-register/register/register?orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName + '&className=' + that.data.className + '&gradeName=' + that.data.gradeName + '&orgName=' + that.data.orgName,'学生二次注册')
          wx.redirectTo({
            url: '/pages/student/student-register/register/register?orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName + '&className=' + that.data.className + '&gradeName=' + that.data.gradeName + '&orgName=' + that.data.orgName
          })
        }
      }
    });
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