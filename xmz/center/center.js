// pages/center/center.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points:0,
    level:'普通会员'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid')
    if (uid) {
      wx.request({
        url: globalData.apiUrl+'user/index?',
        method: 'post',
        data: { uid, uid },
        success: res => {
          this.setData({
            points: res.data.data.integral,
            level: res.data.data.level,
          })
        }
      })
    }
  }
})