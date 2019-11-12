// pages/naicha_wm/naicha_wm.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      "全部", "热销", "新品", "推荐"
    ],
    indexId: 0,
    active:0,
    radio:"2",
    shadow:0,
    list:[],
    index1:[],
    detail:0,
    value:'',
    select:[],
    sl:1,
    addlist:0,
    gwc_red:0
  },
  // 左侧点击事件
  jumpIndex(e) {
    let index = e.currentTarget.dataset.menuindex
    let that = this
    that.setData({
      indexId: index
    });
  },
  select0: function () {
    // 1.查询集合
    wx.showLoading({
      title: '请稍后',
    })
    db.collection("naicha")
      .get()//查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    wx.hideLoading();
  },
  select1:function () {
    // 1.查询集合
    wx.showLoading({
      title: '请稍后',
    })
    db.collection("naicha")
      .where({
        rx:"1"
      })
      .get()//查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    wx.hideLoading();
  },
  select2: function () {
    // 1.查询集合
    wx.showLoading({
      title: '请稍后',
    })
    db.collection("naicha")
      .where({
        xp: "1"
      })
      .get()//查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    wx.hideLoading();
  },
  select3: function () {
    // 1.查询集合
    wx.showLoading({
      title: '请稍后',
    })
    db.collection("naicha")
      .where({
        tj: "1"
      })
      .get()//查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
    wx.hideLoading();
  },
  wm_rx: function () {
    // 1.查询集合
    db.collection("naicha")
      .where({
          "rx":"1"
      })
      .get()//查询
      .then(res => {
        console.log(res)
        var rows = res.data;
        console.log(rows)
        this.setData({
          list: rows
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  onChange:function(event) {
    console.log(event.detail);
  },
  onChange1:function(event) {
    this.setData({
      radio: event.target.dataset.name
    });
    console.log(this.data.radio)
  },
  show:function(event){
    var i=event.target.dataset.index
    this.setData({
      index1:i
    })
    this.setData({
      shadow:1
    })
  },
  detail:function(event){
    var i = event.target.dataset.index_i
    this.setData({
      index1: i
    })
    this.setData({
      detail:1
    })
  },
  del:function(){
    this.setData({
      shadow:0
    })
  },
  hidden:function(){
    this.setData({
      detail:0
    })
  },
  onSearch:function(event){
    console.log(event.detail)
    db.collection("naicha")
    .where({
      title:db.RegExp({ //RegExp正则，与下面关联
        regexp: event.detail,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    })
    .get()
    .then(res=>{
      console.log(res.data)
      this.setData({
        select:res.data
      })
      this.setData({
        list:this.data.select
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  sl:function(event){
    this.setData({
      sl:event.detail
    })
    console.log(this.data.sl)
  },
  addc:function(event){
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
          console.log(typeof(id),id)
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
  gwc_red:function(){
    db.collection("nc_gwc")
      .get()
      .then(res => {
        console.log(res)
        var i = res.data.length
        console.log(i)
        this.setData({
          gwc_red: i
        })
      })
      .catch(err => { console.log(err) })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this.select0();
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