// pages/class/quesAudit/listSubmitted/listSubmitted.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id: '',
    status: '',
    list: [],
    noData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      class_id: options.class_id,
      status: options.status,
      // 从缓存获取年级班级名称
      gradeName: wx.getStorageSync('userInfo').gradeName,
      className: wx.getStorageSync('userInfo').className
    })
  },

  // 获取列表
  getList() {
    var that = this;
    var url='';
    if(that.data.status==1){
      url = cgi.getClassListRes; //查看已生成列表
    } else if (that.data.status == 0){
      url = cgi.getClassNoCopyUserListRes; //查看未生成列表
    }
    wx.request({
      method: 'POST',
      url: url,
      data: {
        class_id: that.data.class_id,
        // status: that.data.status,
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          if (res.data.data && res.data.data.length > 0) {
            that.setData({
              list: res.data.data
            })
          } else {
            that.setData({
              noData: true
            });
            wx.showToast({
              icon: 'none',
              title: '暂无数据',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2001);
              }
            })
          }
          console.log(that.data.list)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
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
    this.getList();
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