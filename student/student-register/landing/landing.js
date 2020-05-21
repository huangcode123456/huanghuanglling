// pages/student/student-register/landing/landing.js
const cgi=require("../../../../constant/cgi.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    disabled:true,
    openid: '',
    orgName: '',
    userName: '',
    gradeName: '',
    gradeId: '',
    classId: '',
    orgid: '',
    token:'',
    userInfo:'',
    className:''
  },


  getOpenid() {//获取用户状态
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.login({
      success(res) {
        const code = res.code;
        wx.request({
          url: cgi.loginTask.code2openid,
          data: { "code": code },
          success(res) {
            that.setData({
              openid: res.data.data.openid
            })
            wx.request({
              method: 'POST',
              url: cgi.loginTask.openidlogin,
              data: {
                openid: res.data.data.openid
              },
              header: {
                'content-type': 'application/json', // 默认值
                'token': that.data.token
              },
              success(res) {
                console.log(res, "student user info")
                if (res.data.code == 404) {
                  that.setData({
                    isShow: true,
                    disabled: false
                  })
                  wx.hideLoading();
                } else if (res.data.code == 200 && res.data.data.userInfo.type != 'CLS' && res.data.data.userInfo.type != 'RPT') {
                  that.setData({
                    isShow: true,
                    disabled: false
                  })
                  wx.hideLoading()
                } else if (res.data.code == 666) {
                  var users = res.data.data.multiBindUserList;
                  for (var i = 0; i < users.length; i++) {
                    if (users[i].type == 'CLS' || users[i].type == 'RPT') {
                      wx.setStorage({
                        key: 'clsRole',
                        data: users[i].type,
                      })
                      var urlInfo = '/pages/student/student-register/status/status?status=' + users[i].status + '&gradeName=' + that.data.gradeName + '&token=' + that.data.token + '&orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&orgName=' + that.data.orgName + '&className=' + that.data.className + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName;
                      wx.reLaunch({
                        url: urlInfo,
                      })
                    }
                  }
                  if (i == users.length) {
                    that.setData({
                      disabled: false,
                      isShow: true
                    })
                    wx.hideLoading()
                  }
                }else{
                  if (res.data.data.status == 2) {
                    that.goToLogin();
                    wx.hideLoading()
                  } else if (res.data.data.status == 0) {
                    var urlInfo = '/pages/student/student-register/status/status?status=' + 0 + '&gradeName=' + that.data.gradeName + '&token=' + that.data.token + '&orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&orgName=' + that.data.orgName + '&className=' + that.data.className + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName;
                    wx.reLaunch({
                      url: urlInfo,
                    })
                    wx.hideLoading();
                  } else if (res.data.data.status == 1) {
                    var urlInfo = '/pages/student/student-register/status/status?status=' + 1 + '&gradeName=' + that.data.gradeName + '&token=' + that.data.token + '&orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&orgName=' + that.data.orgName + '&className=' + that.data.className + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName;
                    wx.reLaunch({
                      url: urlInfo,
                    })
                    wx.hideLoading()
                  }
                }
              }
            })
          }
        })
      }
    })
  },
  // 跳转至注册
  goToRegister() {
    let that = this;
    wx.redirectTo({
      url: '/pages/student/student-register/register/register?token=' + that.data.token + '&orgid=' + that.data.orgid + '&openid=' + that.data.openid + '&classId=' + that.data.classId + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName + '&className=' + that.data.className + '&gradeName=' + that.data.gradeName + '&orgName=' + that.data.orgName,
    })
  },

  // 已有账号跳转登录
  goToLogin() {
    wx.reLaunch({
      url: '/pages/student/login/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo:res.data
        })
      },
    })
    
    that.setData({
      orgName:options.orgName,
      token:options.token,
      classId: options.classId,
      gradeId:options.gradeId,
      orgid: options.orgid,
      userName:options.userName,
      className:options.className,
      gradeName: options.gradeName
    })

    // that.setData({
    //   orgName: '北京市昌平区新龙学校',//options.orgName, 
    //   token: options.token,
    //   classId: 'de11644e15e24f62888a20cc4ae75cae',//options.classId, 
    //   gradeId: 'e89c7fa0281640a292b9887e97960c5a',//options.gradeId, 
    //   orgid: 'c98dbd61-459b-11ea-ac7d-52540005d2d2',//options.orgid, 
    //   userName: '刘老师',//options.userName, 
    //   className: '237班',//options.className, 
    //   gradeName: '二年级'// options.gradeName
    // })
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
    this.getOpenid()
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