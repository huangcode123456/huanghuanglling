// pages/ pointsMall/index/index.js
const globalData = getApp().globalData;
Page({

  data: {
    imgUrl: globalData.imgUrl,
    avatar:'https://profile.csdnimg.cn/5/2/0/3_qq_29407683',
    name:'谢小秋',
    points:'888',
    coupon:'10',
    level:0,
    uid :'',
    // banner: [
    //   globalData.imgUrl +'img/longge/bg-user.png',
    //   globalData.imgUrl +'img/longge/bg-user.png',
    //   globalData.imgUrl +'img/longge/bg-user.png',
    // ],
    banner: [
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
    ],
    category:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  toDetails(e) {
    console.log(e)
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },  
  toMx(){
    wx.navigateTo({
      url: '/pages/integral/details/details',
    })
  },
  toGz(){
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  edit() {
    console.log('edit')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: globalData.apiUrl +'user/banner?',
      method: 'get',
      data: { gid: 49 },
      success: res => {
        this.setData({
          banner: res.data.banner,
          category: res.data.category,
        })
      }
    }) 

    var uid = wx.getStorageSync('uid')
    if(uid){
      wx.request({
        url: globalData.apiUrl +'user/index?',
        method: 'post',
        data:{uid,uid},
        success: res => {
          this.setData({
            points: res.data.data.integral,
            coupon: res.data.data.coupon,
            level: res.data.data.level,
            avatar:res.data.data.avatar,
            name:res.data.data.nickname,
            uid:res.data.data.uid,
            level:res.data.data.level,
          })
        }
      }) 
    }


  },
  qdBtn:function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000,
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