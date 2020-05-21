// pages/class/myCenter/index/index.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  logout() {
    console.log('----------退出登录----------------')
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定退出？',
      success(res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'token',
            success: function (token) {
              console.log(token.data)
              wx.request({
                method: 'POST',
                url: cgi.loginTask.logoutUser,
                header: {
                  'Content-Type': 'application/json',
                  'token': token.data
                },
                success: function (res) {
                  console.log(res, "logout success")
                  if (res.data.code == 200) {
                    wx.clearStorage();
                    wx.showToast({
                      title: '退出成功',
                    })

                    console.log('已经退出');
                    wx.reLaunch({
                      url: '/pages/class/login/login?src=logout&openid='+that.data.userInfo.openid,
                    })
                  } else {
                    wx.showToast({
                      title: '退出失败'
                    })
                  }
                }
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goToIndex: function () {
    wx.reLaunch({
      url: '/pages/class/index/index',
    })
  },
  initUserInfo: function () {
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res, "userinfo")
        that.setData({
          userInfo: res.data
        })
      },
    })
  },
  // 修改个人资料跳转
  goToProfileEdit(){
    wx.navigateTo({
      url: '/pages/class/myCenter/profileEdit/profileEdit',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initUserInfo();
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
    this.initUserInfo();
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