// pages/md/md.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[] //数据结果
  },
  loadMore: function () {
    // 1.查询集合
    db.collection("naicha")
    .get()//查询
    .then(res=>{
      console.log(res)
      var rows=res.data;
      console.log(rows)
      this.setData({
        list:rows
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  wm:function(){
    console.log(1)
    wx.switchTab({
      url: '/pages/naicha_wm/naicha_wm',
    })
  },
  detail:function(event){
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/naicha_detail/naicha_detail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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