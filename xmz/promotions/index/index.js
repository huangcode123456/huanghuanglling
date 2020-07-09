// pages/promotions/index/index.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      globalData.imgUrl +'img/longge/bg-user.png',
      globalData.imgUrl +'img/longge/bg-user.png',
      globalData.imgUrl +'img/longge/bg-user.png',
    ],
    yh_active:[],
    yx_active:[],
    coupnlist:[],

    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
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
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: globalData.apiUrl+'user/banner?',
      data: { pid: 11, uid: uid,gid:51},
      method: 'get',
      success: res => {
       
          this.setData({
            banner: res.data.banner,
            yh_active: res.data.yh_active,
            yx_active: res.data.yx_active,
            coupnlist: res.data.coupnlist,
          })
      }
    })

  },
  detailsBtn:function(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
  },
  lqBtn:function(e){
    console.log(e)
    var that= this
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: globalData.apiUrl +'index/receivecoupon?',
      data: { list_id: e.currentTarget.dataset.list_id, uid: uid },
      method: 'post',
      success: res => {
        if(res.data.code==1){
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/coupons/coupons',
                })
              }, 2000);
            }
          })
        }else{
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000,
          })
      
        }
 
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var uid = wx.getStorageSync('uid');
    // wx.request({
    //   url: globalData.apiUrl +'user/banner?',
    //   data: { pid: 11, uid: uid },
    //   method: 'get',
    //   success: res => {

    //     this.setData({
    //       banner: res.data.banner,
    //       yh_active: res.data.yh_active,
    //       yx_active: res.data.yx_active,
    //       coupnlist: res.data.coupnlist,
    //     })
    //   }
    // })
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