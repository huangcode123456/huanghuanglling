// pages/naicha_detail/naicha_detail.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    shadow:0
  },
  hidden(){
    wx.switchTab({
      url: '/pages/naicha0/naicha0',
    })
  },
  show(event) {
    this.setData({
      shadow: 1
    })
  },
  del: function () {
    this.setData({
      shadow: 0
    })
  },
  // 加入购物车
  addc: function (event) {
    wx.showLoading({
      title: '请稍后',
    })
    var id = event.target.dataset._id
    db.collection("nc_gwc")
      .doc(id)
      .get()//查询
      .then(res => {
        var rows = res.data;
        var sl = this.data.sl
        console.log(typeof (id), id)
        db.collection("nc_gwc")
          .doc(id)
          .update({
            data: {
              sl: sl
            }
          })
          .then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '添加成功',
            })
            this.del();
            this.gwc_red();
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => {
        var sl = this.data.sl
        var bx = this.data.radio
        db.collection("nc_gwc")
          .add({
            data: {
              _id: id,
              bx: bx,
              sl: sl
            }
          })
          .then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '添加成功',
            })
            this.del();
            this.gwc_red();
          })
          .catch(err => { console.log(err) })
      })
  },
  // 杯型
  onChange1: function (event) {
    this.setData({
      radio: event.target.dataset.name
    });
    console.log(this.data.radio)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    db.collection("naicha")
    // .doc(id)
    .doc(id)
    .get()
    .then(res=>{
      this.setData({
        list:res.data
      })
    })
    .catch(err=>{
      console.log(err)
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