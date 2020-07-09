// pages/pointsMall/list/list.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var cate_id = options.cate_id
    var that = this
    wx.request({
      url: globalData.apiUrl +'index/getgoodslist?',
      data : {cate_id:cate_id},
      method: 'post',
      success: res => {
        this.setData({
          product_list :  res.data.data 
        })
        wx.setNavigationBarTitle({
          title: res.data.fenlei 
        })
      }
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