// pages/integral/details/details.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    font_col:'font_jia',
    datalist:{
      jifen: '1555',
      arr:[
        {
          title:'购买西门子',
          date:'2020年02月03日',
          num:'+999'
        },
        {
          title: '购买西门子',
          date: '2020年02月03日',
          num: '+999'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var uid = wx.getStorageSync('uid')
    var that=this
    wx.request({
      url: globalData.apiUrl+'user/pointDetail?',
      method: 'get',
      data:{uid:uid},
      success: res => {
        //＋   font_jia
        //-    font_jian
        that.setData({
            font_col:'font_jia',
            datalist:res.data.info
          })  
      }
    })
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